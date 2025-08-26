export function getUniquePlatforms(games) {
  const platforms = new Set();
  games.forEach(game => {
    // Some games have multiple platforms separated by a comma.
    const platformNames = game.platform.split(',').map(p => p.trim());
    //console.log(platformNames);
    platformNames.forEach(p => platforms.add(p));
  });
  console.log("Unique platforms:", platforms);
  return platforms;
}
