"""Boundary-focused tests for the scheduling rules."""

from datetime import datetime, timedelta, timezone

import pytest

from schedule import Assignment, Interval, assignment_conflicts, at, coverage_gaps, overlaps, sample_schedule


def assignment(person, start, end):
    """Build a concise assignment fixture."""
    return Assignment(person, Interval(at(start), at(end)), "QA")


def test_adjacent_intervals_do_not_overlap():
    """An ending boundary is excluded from the interval."""
    assert not overlaps(Interval(at(8), at(12)), Interval(at(12), at(16)))


def test_positive_duration_intervals_overlap():
    """A shared minute is treated as a real scheduling conflict."""
    assert overlaps(Interval(at(8), at(12, 1)), Interval(at(12), at(16)))


def test_rejects_zero_or_negative_duration():
    """Invalid ranges fail early instead of corrupting coverage results."""
    with pytest.raises(ValueError, match="after start"):
        Interval(at(8), at(8))


def test_rejects_naive_datetimes():
    """Every interval must declare its timezone."""
    with pytest.raises(ValueError, match="timezone-aware"):
        Interval(datetime(2026, 9, 8, 8), datetime(2026, 9, 8, 9))


def test_detects_same_person_assignment_overlap():
    """Overlapping work for one person produces one stable finding."""
    shifts = [assignment("Alex", 8, 12), assignment("Alex", 11, 14)]
    assert assignment_conflicts(shifts, {}) == ["Alex: overlapping assignments"]


def test_allows_different_people_to_overlap():
    """Concurrent work by different people is valid team coverage."""
    shifts = [assignment("Alex", 8, 12), assignment("Sam", 8, 12)]
    assert assignment_conflicts(shifts, {}) == []


def test_leave_touching_shift_boundary_is_allowed():
    """Leave ending exactly when work starts is not a conflict."""
    leave = {"Alex": [Interval(at(7), at(8))]}
    assert assignment_conflicts([assignment("Alex", 8, 12)], leave) == []


def test_detects_assignment_during_leave():
    """Any positive-duration intersection with leave is reported."""
    leave = {"Alex": [Interval(at(11), at(13))]}
    assert assignment_conflicts([assignment("Alex", 8, 12)], leave) == ["Alex: assignment during approved leave"]


def test_merges_coverage_before_finding_gaps():
    """Overlapping team shifts do not create duplicate gap segments."""
    window = Interval(at(8), at(18))
    shifts = [assignment("Alex", 8, 12), assignment("Sam", 11, 16)]
    assert coverage_gaps(window, shifts) == [Interval(at(16), at(18), "Coverage gap")]


def test_reports_internal_and_edge_coverage_gaps():
    """Coverage gaps at both edges and within the day remain visible."""
    window = Interval(at(8), at(18))
    shifts = [assignment("Alex", 9, 12), assignment("Sam", 13, 17)]
    assert coverage_gaps(window, shifts) == [Interval(at(8), at(9), "Coverage gap"), Interval(at(12), at(13), "Coverage gap"), Interval(at(17), at(18), "Coverage gap")]


def test_complete_coverage_has_no_gaps():
    """Adjacent assignments can cover the full expected window."""
    window = Interval(at(8), at(18))
    assert coverage_gaps(window, [assignment("Alex", 8, 12), assignment("Sam", 12, 18)]) == []


def test_equivalent_instants_across_timezones_overlap():
    """Timezone conversion preserves comparisons across UTC offsets."""
    utc_shift = Interval(at(8).astimezone(timezone.utc), at(9).astimezone(timezone.utc))
    assert overlaps(Interval(at(8), at(9)), utc_shift)


def test_overnight_interval_is_valid():
    """An interval may cross midnight when its end remains later."""
    start = at(18)
    assert Interval(start, start + timedelta(hours=10)).end.day == 9


def test_sample_exposes_intended_risks():
    """The review fixture stays stable and educational."""
    window, shifts, leave = sample_schedule()
    assert len(assignment_conflicts(shifts, leave)) == 2
    assert [(gap.start.hour, gap.start.minute) for gap in coverage_gaps(window, shifts)] == [(16, 0)]
