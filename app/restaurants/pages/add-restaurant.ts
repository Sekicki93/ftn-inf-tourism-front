import { createRestaurant } from "../../services/restaurantService";

const form = document.getElementById("restaurant-form") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const newRestaurant = {
    id: 0,
    naziv: (document.getElementById("name") as HTMLInputElement).value,
    opis: (document.getElementById("description") as HTMLTextAreaElement).value,
    kapacitet: parseInt((document.getElementById("capacity") as HTMLInputElement).value),
    slike: (document.getElementById("images") as HTMLInputElement).value.split(","),
    lat: parseFloat((document.getElementById("lat") as HTMLInputElement).value),
    lon: parseFloat((document.getElementById("lon") as HTMLInputElement).value),
    status: "u pripremi",
    autorId: user.id, // ha szükséges
  };

  await createRestaurant(newRestaurant);
  window.location.href = "./my-restaurants.html";
});
