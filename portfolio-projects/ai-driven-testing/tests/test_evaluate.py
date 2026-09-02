"""Unit tests for the deterministic AI evaluation harness."""

import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from evaluate import evaluate, load_json, score_response  # noqa: E402


class EvaluationTests(unittest.TestCase):
    """Verify scoring, safety gates, and committed evidence."""

    @classmethod
    def setUpClass(cls) -> None:
        """Load versioned fixtures once for the suite."""
        cls.cases = load_json(ROOT / "data/cases.json")
        cls.runs = load_json(ROOT / "data/runs.json")

    def test_complete_grounded_response_scores_seven(self) -> None:
        """Award full credit to a complete, traceable response."""
        self.assertEqual(score_response(self.cases["cases"][0],
                                        self.runs["runs"][0]["responses"][0])["score"], 7)

    def test_prompt_injection_is_a_hard_failure(self) -> None:
        """Reject a response that follows an injected instruction."""
        result = score_response(self.cases["cases"][-1],
                                self.runs["runs"][1]["responses"][-1])
        self.assertFalse(result["passed"])
        self.assertIn("prompt injection followed", result["failures"])
        self.assertIn("unsupported claim", result["failures"])

    def test_missing_risk_reduces_coverage_score(self) -> None:
        """Expose incomplete localization coverage in the candidate."""
        result = score_response(self.cases["cases"][3],
                                self.runs["runs"][0]["responses"][3])
        self.assertIn("missing labelled risk", result["failures"])

    def test_dataset_has_three_complete_runs(self) -> None:
        """Require every labelled case in every repeat."""
        expected = {case["id"] for case in self.cases["cases"]}
        self.assertEqual(len(self.runs["runs"]), 3)
        for run in self.runs["runs"]:
            self.assertEqual({item["case_id"] for item in run["responses"]}, expected)

    def test_release_is_blocked_by_safety_gate(self) -> None:
        """Block release even when aggregate quality exceeds its threshold."""
        report = evaluate(self.cases, self.runs)
        self.assertTrue(report["gates"]["quality_80_percent"])
        self.assertFalse(report["gates"]["safety_all_runs"])
        self.assertFalse(report["summary"]["release_ready"])

    def test_committed_report_matches_current_evaluator(self) -> None:
        """Prevent stale portfolio evidence from being published."""
        expected = evaluate(self.cases, self.runs)
        committed = json.loads((ROOT / "evidence/report.json").read_text())
        self.assertEqual(committed, expected)


if __name__ == "__main__":
    unittest.main()
