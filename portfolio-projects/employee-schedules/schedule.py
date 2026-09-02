"""Scheduling rules for the employee timeline sample."""

from dataclasses import dataclass
from datetime import datetime
from zoneinfo import ZoneInfo

TIMEZONE = ZoneInfo("America/Toronto")


@dataclass(frozen=True, order=True)
class Interval:
    """A labelled, timezone-aware half-open interval."""

    start: datetime
    end: datetime
    label: str = ""

    def __post_init__(self) -> None:
        if self.start.tzinfo is None or self.end.tzinfo is None:
            raise ValueError("interval times must be timezone-aware")
        if self.start >= self.end:
            raise ValueError("interval end must be after start")


@dataclass(frozen=True)
class Assignment:
    """A person's scheduled work interval."""

    person: str
    interval: Interval
    role: str


def overlaps(left: Interval, right: Interval) -> bool:
    """Return whether half-open intervals share positive duration."""

    return left.start < right.end and right.start < left.end


def assignment_conflicts(
    assignments: list[Assignment], leave: dict[str, list[Interval]]
) -> list[str]:
    """Return stable, human-readable overlap and leave conflicts."""

    findings: list[str] = []
    ordered = sorted(assignments, key=lambda item: (item.person, item.interval.start))
    for index, current in enumerate(ordered):
        for other in ordered[index + 1 :]:
            if other.person != current.person:
                break
            if overlaps(current.interval, other.interval):
                findings.append(f"{current.person}: overlapping assignments")
        if any(overlaps(current.interval, period) for period in leave.get(current.person, [])):
            findings.append(f"{current.person}: assignment during approved leave")
    return sorted(set(findings))


def coverage_gaps(window: Interval, assignments: list[Assignment]) -> list[Interval]:
    """Return uncovered portions of a support window, merging coverage."""

    covered = sorted(
        (max(item.interval.start, window.start), min(item.interval.end, window.end))
        for item in assignments
        if overlaps(window, item.interval)
    )
    gaps: list[Interval] = []
    cursor = window.start
    for start, end in covered:
        if start > cursor:
            gaps.append(Interval(cursor, start, "Coverage gap"))
        cursor = max(cursor, end)
    if cursor < window.end:
        gaps.append(Interval(cursor, window.end, "Coverage gap"))
    return gaps


def at(hour: int, minute: int = 0) -> datetime:
    """Create a fixture time on the sample planning day."""

    return datetime(2026, 9, 8, hour, minute, tzinfo=TIMEZONE)


def sample_schedule() -> tuple[Interval, list[Assignment], dict[str, list[Interval]]]:
    """Return a small fixture containing one gap and two conflicts."""

    window = Interval(at(8), at(18), "Support window")
    assignments = [
        Assignment("Maya Chen", Interval(at(8), at(12), "Morning"), "QA Lead"),
        Assignment("Jon Bell", Interval(at(11), at(15), "Core"), "QA Engineer"),
        Assignment("Jon Bell", Interval(at(14), at(16), "Release"), "QA Engineer"),
        Assignment("Priya Shah", Interval(at(16, 30), at(18), "Late"), "SDET"),
    ]
    leave = {"Maya Chen": [Interval(at(11), at(12), "Approved leave")]}
    return window, assignments, leave
