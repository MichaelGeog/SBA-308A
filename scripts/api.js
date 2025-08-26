export const BASE = "https://free-to-play-games-database.p.rapidapi.com/api";
export const HEADERS = {
  "X-RapidAPI-Key": "28ef8cf1d2msh020e09193fec29cp1d5f8ejsnc51d68fcf7b2",
  "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
};

export async function fetchGames() {
  try {
    const res = await fetch(`${BASE}/games`, { headers: HEADERS });
    //console.log(res);
    if (!res.ok) {
      throw new Error(`API response error: ${res.status}`);
    }
    const data = await res.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return []; // Return an empty array on error
  }
}