import { fetchGames } from "./api.js";
import { getUniquePlatforms } from "./platforms.js";
import { buildOrganizedGames } from "./games.js";

let allGames = [];
let organizedGames = {};

// Select the main elements from the HTML
const platformList = document.getElementById("platform-list");
const categoryList = document.getElementById("category-list");
const gameList = document.getElementById("game-list");
const gameDetails = document.getElementById("game-details");


// Hides all content sections except for the one specified.
function showSection(sectionToShow) {
  const sections = [platformList, categoryList, gameList, gameDetails];
  // loop through sections to hide
  sections.forEach((section) => {
    section.style.display = "none";
  });
  // show the selected section
  if (sectionToShow) {
    sectionToShow.style.display = "block";
  }
}


// Renders the list of unique platforms as buttons.
function renderPlatforms() {
  // get all the platforms
  const uniquePlatforms = getUniquePlatforms(allGames);
  platformList.innerHTML = ""; // Clear previous content
  //loop through platforms and create a button for it when clicked it will show the categories for it
  uniquePlatforms.forEach((platform) => {
    const button = document.createElement("button");
    button.textContent = platform;
    button.className = "platform-button";
    button.addEventListener("click", () => renderCategories(platform));
    platformList.appendChild(button);
  });
  showSection(platformList);
}

// Renders the categories for a selected platform.
function renderCategories(selectedPlatform) {
  // get all categories for the selected platform
  const categories = organizedGames[selectedPlatform];
  categoryList.innerHTML = "";
  if (categories) {
    // access the categories keys
    const categoriesSet = new Set(Object.keys(categories));
    //loop through categories and create a button for it when clicked it will show the games for it 
    categoriesSet.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.className = "category-button";
      button.addEventListener("click", () =>
        renderGames(selectedPlatform, category)
      );
      categoryList.appendChild(button);
    });
    showSection(categoryList);
  }
}

// Renders the games for a selected category and platform.
function renderGames(selectedPlatform, selectedCategory) {
  // get all games for the selected platform and category
  const games = organizedGames[selectedPlatform][selectedCategory];
  gameList.innerHTML = "";
  if (games) {
    //loop through games and create a div for it when clicked it will show the gane card
    games.forEach((game) => {
      const gameItem = document.createElement("div");
      gameItem.textContent = game.title;
      gameItem.className = "game-item";
      gameItem.addEventListener("click", () => renderGameDetails(game));
      gameList.appendChild(gameItem);
    });
    showSection(gameList);
  }
}

// Renders the detailed information for a selected game.
function renderGameDetails(game) {
  // setting the game card template
  gameDetails.innerHTML = `
    <div class="game-details-card">
      <h2 class="game-title">${game.title}</h2>
      <img src="${game.thumbnail}" alt="Thumbnail for ${game.title}" class="game-thumbnail">
      <div class="game-info">
        <p><strong>Platform:</strong> ${game.platform}</p>
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p><strong>Description:</strong> ${game.short_description}</p>
      </div>
      <a href="${game.game_url}" target="_blank" class="play-now-btn">Play Now</a>
    </div>
    <a id="back-btn" class="play-now-btn" style="margin-top: 0px; cursor: pointer;">Back To Platforms</a>
  `;
  showSection(gameDetails);

  // make the back button go to the platforms section
  const backButton = document.getElementById("back-btn");
  backButton.addEventListener("click", () => {
    renderPlatforms(); 
  });
}

// The main entry point function
async function main() {
  // get all games info
  allGames = await fetchGames();
  if (allGames.length > 0) {
    // build our own games object so it can be used later
    organizedGames = buildOrganizedGames(allGames);
    // show platform section first
    renderPlatforms();
  }
}

// Start the application
main();