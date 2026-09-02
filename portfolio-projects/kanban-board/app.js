import { columns, initialCards, isAgeing, metrics, moveCard } from "./model.js";
let cards = structuredClone(initialCards);
const board = document.querySelector("#board");
const announcement = document.querySelector("#announcement");

function render() {
  board.replaceChildren(...columns.map(renderColumn));
  const flow = metrics(cards);
  document.querySelector("#cycle-time").textContent = `${flow.medianCycleTime}d`;
  document.querySelector("#throughput").textContent = flow.throughput;
  document.querySelector("#blocked-count").textContent = flow.blocked;
}
function renderColumn(column) {
  const items = cards.filter((card) => card.column === column.id);
  const section = document.createElement("section");
  section.className = "column";
  section.setAttribute("aria-labelledby", `column-${column.id}`);
  section.innerHTML = `<div class="column-heading"><h2 id="column-${column.id}">${column.label}</h2><span>${items.length} / ${column.limit === Infinity ? "∞" : column.limit}</span></div><p class="policy">${policy(column.id)}</p>`;
  items.forEach((card) => section.append(renderCard(card)));
  return section;
}
function renderCard(card) {
  const article = document.createElement("article");
  article.className = `card${card.blocked ? " blocked" : ""}${isAgeing(card) ? " ageing" : ""}`;
  article.innerHTML = `<div class="card-body"><span class="tag">${card.blocked ? "BLOCKED" : isAgeing(card) ? "AGEING" : "QUALITY"}</span><strong>${card.title}</strong><span class="meta">${card.owner} · ${card.age}d in system</span></div><div class="actions"><button data-move="-1" data-id="${card.id}" aria-label="Move ${card.title} left">←</button><button data-move="1" data-id="${card.id}" aria-label="Move ${card.title} right">→</button></div>`;
  return article;
}
function policy(id) { return { ready: "Prioritised and testable", progress: "Owner assigned; WIP ≤ 2", review: "Evidence attached", done: "Acceptance criteria met" }[id]; }
board.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const cardId = Number(button.dataset.id);
  const outcome = moveCard(cards, cardId, Number(button.dataset.move));
  cards = outcome.cards;
  announcement.textContent = outcome.error || outcome.message;
  render();
});
render();
