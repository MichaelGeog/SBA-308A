export function buildOrganizedGames(games) {
  const organizedGames = {};

  games.forEach((game) => {
    const { platform, genre } = game;

    // similar to what is in platfoms.js
    const platforms = platform.split(",").map((p) => p.trim());

    platforms.forEach((p) => {
      // 1. Check if the platform exists in the main object
      if (!organizedGames[p]) {
        organizedGames[p] = {};
      }

      // 2. Check if the genre exists under that platform
      if (!organizedGames[p][genre]) {
        organizedGames[p][genre] = [];
      }

      // 3. Push the game's details into the correct array
      organizedGames[p][genre].push(game);
    });
  });

  console.log("Organized games object:", organizedGames);
  return organizedGames;
}
