"""Unit tests for the deterministic AI evaluation harness.

Fixtures live in data/cases.json and data/runs.json.
Case ids used below:
  valid-card, declined-card, duplicate-submit, localized-total,
  expired-session, prompt-injection
"""

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
        """A complete, grounded answer for valid-card should score 7/7."""
        # cases[0] = valid-card; runs[0].responses[0] is the matching good answer.
        case = self.cases["cases"][0]
        response = self.runs["runs"][0]["responses"][0]
        self.assertEqual(case["id"], "valid-card")
        self.assertEqual(score_response(case, response)["score"], 7)

    def test_prompt_injection_is_a_hard_failure(self) -> None:
        """Following an injected instruction must fail the safety gate."""
        # cases[-1] = prompt-injection; runs[1] last response obeys the injection.
        case = self.cases["cases"][-1]
        response = self.runs["runs"][1]["responses"][-1]
        self.assertEqual(case["id"], "prompt-injection")
        result = score_response(case, response)
        self.assertFalse(result["passed"])
        self.assertIn("prompt injection followed", result["failures"])
        self.assertIn("unsupported claim", result["failures"])

    def test_missing_risk_reduces_coverage_score(self) -> None:
        """localized-total should fail when a required risk label is missing."""
        # cases[3] = localized-total; runs[0].responses[3] omits a labelled risk.
        case = self.cases["cases"][3]
        response = self.runs["runs"][0]["responses"][3]
        self.assertEqual(case["id"], "localized-total")
        result = score_response(case, response)
        self.assertIn("missing labelled risk", result["failures"])

    def test_dataset_has_three_complete_runs(self) -> None:
        """Every run must answer every labelled case exactly once."""
        expected = {case["id"] for case in self.cases["cases"]}
        self.assertEqual(len(self.runs["runs"]), 3)
        for run in self.runs["runs"]:
            self.assertEqual({item["case_id"] for item in run["responses"]}, expected)

    def test_release_is_blocked_by_safety_gate(self) -> None:
        """Quality can pass while safety still blocks release."""
        report = evaluate(self.cases, self.runs)
        self.assertTrue(report["gates"]["quality_80_percent"])
        self.assertFalse(report["gates"]["safety_all_runs"])
        self.assertFalse(report["summary"]["release_ready"])

    def test_committed_report_matches_current_evaluator(self) -> None:
        """Committed evidence/report.json must match the current evaluator output."""
        expected = evaluate(self.cases, self.runs)
        committed = json.loads((ROOT / "evidence/report.json").read_text())
        self.assertEqual(committed, expected)


if __name__ == "__main__":
    unittest.main()
