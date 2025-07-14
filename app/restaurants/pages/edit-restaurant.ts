import { updateRestaurant, getMyRestaurants } from "../services/restaurantService";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const nameInput = document.getElementById("name") as HTMLInputElement;
const descInput = document.getElementById("description") as HTMLTextAreaElement;
const capInput = document.getElementById("capacity") as HTMLInputElement;
const imgInput = document.getElementById("images") as HTMLInputElement;
const latInput = document.getElementById("lat") as HTMLInputElement;
const lonInput = document.getElementById("lon") as HTMLInputElement;

const form = document.getElementById("edit-form") as HTMLFormElement;

window.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const restaurants = await getMyRestaurants(user.id);
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return;

  nameInput.value = restaurant.naziv;
  descInput.value = restaurant.opis;
  capInput.value = restaurant.kapacitet.toString();
  imgInput.value = restaurant.slike.join(",");
  latInput.value = restaurant.lat.toString();
  lonInput.value = restaurant.lon.toString();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedRestaurant = {
    id: id,
    naziv: nameInput.value,
    opis: descInput.value,
    kapacitet: parseInt(capInput.value),
    slike: imgInput.value.split(","),
    lat: parseFloat(latInput.value),
    lon: parseFloat(lonInput.value),
    status: "u pripremi"
  };

  await updateRestaurant(updatedRestaurant);
  window.location.href = "my-restaurants.html";
});
