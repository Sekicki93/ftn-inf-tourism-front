import { Restaurant } from "../models/restaurant";

const BASE_URL = "http://localhost:3000/api/restaurants"; // Módosítsd ha más a backend

export async function getMyRestaurants(userId: number): Promise<Restaurant[]> {
  const response = await fetch(`${BASE_URL}/owner/${userId}`);
  return await response.json();
}

export async function createRestaurant(restaurant: Restaurant) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant)
  });
  return await response.json();
}

export async function deleteRestaurant(id: number) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

export async function updateRestaurant(restaurant: Restaurant) {
  await fetch(`${BASE_URL}/${restaurant.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant)
  });
}
