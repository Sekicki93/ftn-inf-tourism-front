export interface Restaurant {
  id: number;
  naziv: string;
  opis: string;
  kapacitet: number;
  slike: string[]; // Képek URL-jei
  lat: number;     // Szélesség
  lon: number;     // Hosszúság
  status: string;  // pl. "u pripremi"
}
