import { getMyRestaurants, deleteRestaurant } from "../services/restaurantService";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const container = document.createElement("div");
document.body.appendChild(container);

window.addEventListener("DOMContentLoaded", async () => {
  const restaurants = await getMyRestaurants(user.id);

  restaurants.forEach((r) => {
    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
      <h2>${r.naziv}</h2>
      <p>${r.opis}</p>
      <p>Kapacitet: ${r.kapacitet}</p>
      <p>Status: ${r.status}</p>
      <button class="edit-btn" data-id="${r.id}">Izmeni</button>
      <button class="delete-btn" data-id="${r.id}">Obriši</button>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      const id = Number((e.target as HTMLElement).getAttribute("data-id"));
      await deleteRestaurant(id);
      window.location.reload();
    })
  );

  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = (e.target as HTMLElement).getAttribute("data-id");
      window.location.href = `edit-restaurant.html?id=${id}`;
    })
  );
});
