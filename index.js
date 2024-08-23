/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){

        // create a new div element, which will become the game card
        const gameDiv = document.createElement("div");

        // add the class game-card to the list
        gameDiv.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameDiv.innerHTML = 
        `
        <img src="${games[i].img}" alt="${games[i].name}" class="game-img"/>
        <h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        `


        // append the game to the games-container
        gamesContainer.appendChild(gameDiv)
    }

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_cont = GAMES_JSON.reduce((acc, game)=>{
    return acc+game.backers;
},0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = total_cont.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
let total_rais = GAMES_JSON.reduce((acc, game)=>{
    return acc+game.pledged;
},0);

raisedCard.innerHTML = "$" + total_rais.toLocaleString('en-US');


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let num_games = GAMES_JSON.length

gamesCard.innerHTML = num_games.toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// using reduce
let unfunded_count = GAMES_JSON.reduce((acc, game)=>{
    return acc+(game.pledged < game.goal ? 1 : 0);
},0);
//using filter
// let unfunded_count = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayString =
    `A total of $${total_rais.toLocaleString('en-US')} has been raised for ${total_cont.toLocaleString('en-US')} games. Currently, ${unfunded_count} ${unfunded_count===1 ? 'game remains': 'games remain'} unfunded. We need your help to fund these games!`

// create a new DOM element containing the template string and append it to the description container

const descCont = document.getElementById('description-container');
const sumPar = document.createElement('p');
sumPar.textContent = displayString;
descCont.appendChild(sumPar)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const top = sortedGames[0];
const runner = sortedGames[1];

console.log(top)
console.log(runner)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topNameElement = document.createElement('h3');
topNameElement.textContent = top.name;
firstGameContainer.appendChild(topNameElement);

// do the same for the runner up item
const runnerNameElement = document.createElement('h3');
runnerNameElement.textContent = runner.name;
secondGameContainer.appendChild(runnerNameElement);