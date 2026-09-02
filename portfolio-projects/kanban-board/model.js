export const columns = [
  { id: "ready", label: "Ready", limit: 3 },
  { id: "progress", label: "In progress", limit: 2 },
  { id: "review", label: "Review", limit: 2 },
  { id: "done", label: "Done", limit: Infinity },
];

export const initialCards = [
  { id: 1, title: "Guest checkout smoke test", owner: "Maya", column: "ready", age: 1 },
  { id: 2, title: "Payment API contract checks", owner: "Eric", column: "progress", age: 6, blocked: true },
  { id: 3, title: "Keyboard navigation audit", owner: "Noah", column: "progress", age: 2 },
  { id: 4, title: "Tax calculation boundary tests", owner: "Ava", column: "review", age: 3 },
  { id: 5, title: "Release regression report", owner: "Eric", column: "done", age: 4, cycleTime: 3 },
  { id: 6, title: "Cart persistence scenarios", owner: "Maya", column: "done", age: 4, cycleTime: 4 },
  { id: 7, title: "Promo code risk review", owner: "Ava", column: "done", age: 3, cycleTime: 2 },
  { id: 8, title: "Browser support matrix", owner: "Noah", column: "done", age: 5, cycleTime: 5 },
];

export function moveCard(cards, cardId, direction) {
  const card = cards.find((item) => item.id === cardId);
  if (!card) return { cards, error: "Card not found." };
  if (card.blocked) return { cards, error: "Blocked work must be resolved before moving." };
  const currentIndex = columns.findIndex((column) => column.id === card.column);
  const target = columns[currentIndex + direction];
  if (!target) return { cards, error: "Card is already at the workflow boundary." };
  const targetCount = cards.filter((item) => item.column === target.id).length;
  if (targetCount >= target.limit) return { cards, error: `${target.label} is at its WIP limit.` };
  return { cards: cards.map((item) => item.id === cardId ? { ...item, column: target.id } : item), message: `${card.title} moved to ${target.label}.` };
}

export function metrics(cards) {
  const completed = cards.filter((card) => card.column === "done");
  const times = completed.map((card) => card.cycleTime).sort((a, b) => a - b);
  const middle = Math.floor(times.length / 2);
  const median = times.length % 2 ? times[middle] : (times[middle - 1] + times[middle]) / 2;
  return { blocked: cards.filter((card) => card.blocked).length, throughput: completed.length, medianCycleTime: median };
}

export function isAgeing(card, threshold = 5) { return card.column !== "done" && card.age >= threshold; }
