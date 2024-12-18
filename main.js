//gives the url and its endpoints variables
const URL = 'https://rickandmortyapi.com/api/';
let episodeUrl = 'episode';
let characterUrl = 'character';

//targets elements in the DOM
let page1List = document.getElementById('page1-list');
let page2List = document.getElementById('page2-list');
let page3List = document.getElementById('page3-list');
let characterList = document.getElementById("character-list");
let episodeDisplay = document.getElementById('episode-display');
let options = document.querySelectorAll('option');
let characterPage1 = document.querySelector('#character-page1');
let characterPage2 = document.querySelector('#character-page2');
let characterPage3 = document.querySelector('#character-page3');
let characterPage4 = document.querySelector('#character-page4');
let characterPage5 = document.querySelector('#character-page5');
let characterPage6 = document.querySelector('#character-page6');
let mode = document.getElementById('light-dark');
let episodeContainer = document.getElementById('episode-container');
let charSection = document.getElementById('char-section');

                    // DOM EVENT LISTENER 
//Event listener for when the DOM is loaded
document.addEventListener('DOMContentLoaded',() => {

    showFirstEpisode(); 
    //fetches data for options
    dropdown(page = 1); 
    dropdown(page = 2); 
    dropdown(page = 3); 
    //show characters in the 2nd section
    getCharacters(); 
});

                    // SHOWS FIRST EPISODE DETAILS 

//for showing first episode details when DOM loads
async function showFirstEpisode() {
    try{
        let response = await fetch(URL+episodeUrl);
        let episodes = await response.json();

        let episode = episodes.results; 
        displayEpisode(episode[0]); 

    } catch (error) {
        console.error("Failed to fetch episodes:", error);
        episodeDisplay.innerHTML = `<p class="error">Unable to select episodes. Please try again later.</p>`;
    };
};

                    // FUNCTION FOR FETCHING DATA TO OPTIONS 

//calls function for creating options depending on the page number
async function dropdown(page = 1) {
    //checks which page has been called an assigns its suitable url endpoint
    if(page == 1){
        episodeUrl='episode';
        dropDownFetch(episodeUrl, page1List);

    } else if (page==2) {
        episodeUrl='episode?page=2';
        dropDownFetch(episodeUrl, page2List);

    } else{
        episodeUrl = 'episode?page=3';
        dropDownFetch(episodeUrl, page3List);
    };      
};

async function dropDownFetch(episodeUrl, pageList) {
    try{
        let response = await fetch(URL+episodeUrl);
        let episodes = await response.json();

        let array = episodes.results;
        array.forEach(episode => {
            let epOption = displayPage(episode);
            pageList.append(epOption);
        });
    } catch (error) {
        console.error("Failed to fetch episodes for dropdown menu:", error);
        episodeDisplay.innerHTML = `<p class="error">Unable to fill dropdown menu with episodes. Please try again later.</p>`;
    };
};

                    // FUNCTIONS TO DISPLAY OPTION SELECT 

function displayPage(episode) {
    //creates the options tag and provide a unique id to each
    let epOption = document.createElement('option');
    epOption.id = `episode${episode. id}`;
    epOption.value = `${episode. id}`;
    epOption.textContent = `${episode. episode}`;

    return epOption;
};

            //EVENT LISTENERS FOR CHANGING THE OPTIONS SELECT

//change event listener for page 1
page1List.addEventListener('change', function() {
    handleSelect(this.value,page = 1);
});
//change event listener for page 2
page2List.addEventListener('change', function() {
    handleSelect(this.value, page = 2);
});
//change event listener for page 3
page3List.addEventListener('change', function() {
    handleSelect(this.value, page = 3);
});

                //FUNCTIONS THAT HANDLES SELECT OPTIONS
//function that handles change event listener
async function handleSelect (episodeId, page = 1) {
    //checks which page the request was given from and assigns the right url endpoint to it
    if(page == 1){
        episodeUrl='episode';
    } else if (page==2) {
        episodeUrl='episode?page=2';
    } else{
        episodeUrl = 'episode?page=3';
    };
    try{
        let response = await fetch(URL+episodeUrl);
        let episodes = await response.json();
        let array = episodes.results;
        episodeId = parseInt(episodeId,10); //converts to integer
        let episodeSelected = array.find(episode => episode. id == episodeId); ///looks for the first instance where is are similar
        displayEpisode(episodeSelected); //displays selected episode
    } catch (error) {
        console.error("Failed to fetch episodes:", error);
        episodeDisplay.innerHTML = `<p class="error">Unable to select episodes. Please try again later.</p>`;
    };

};

                    //FUNCTION THAT DISPLAYS THE EPISODES AND THEIR DETAILS
// //displays the episodes
function displayEpisode (episode) {
    
    episodeDisplay.innerHTML = ''; //resets the html of episodeDisplay
    let epList = document.createElement('div');
    epList.id = 'display-container';
    let epName = document.createElement('p');
    epName.id = 'oneEpName';
    let epAirDate = document.createElement('p');
    epAirDate.id = 'oneAirDate';

    //created to contain the h4 tag and the list of characters that appeared
    let charDiv = document.createElement('div');
    charDiv.classList.add('char-div');

    //creates small title
    let descOfCarDiv = document.createElement('h4');
    descOfCarDiv.textContent = 'Characters involved in the episode';

    //creates main image container
    let mainImageContainer = document.createElement('div');
    mainImageContainer.id = 'main-image-container';

    let characters = episode .characters; //assigns variable the key value pair of results to get the required array
    characters.forEach(character => createAndPopulate(character));

    //inner function that creates and populates character details
    async function createAndPopulate(characterURL) {
        try{
            let response = await fetch(characterURL);
            let res = await response.json();
            //for div container
            let characterDivContainer = document.createElement('div');
            characterDivContainer.classList.add('character-div-container');
                
            //for characters name
            let characterName = document.createElement('p');
            characterName.classList.add('character-name');
            characterName.textContent = `${res. name}`;

            //for characters image
            let characterImage = document.createElement('img');
            characterImage.classList.add('character-image-dropmenu');
            characterImage.src = `${res. image}`;

            //appending elements
            characterDivContainer.append(characterImage);
            characterDivContainer.append(characterName);
            mainImageContainer.append(characterDivContainer);  
        } catch (error){
            console.error("Failed to fetch characters:", error);
            episodeDisplay.innerHTML = `<p class="error">Unable to load characters. Please try again later.</p>`;
        };     
    }

    epName.innerHTML = `<span>Name of the episode: <strong>${episode. name}</strong></span>`;
    epAirDate.innerHTML = `<span>Date aired: <strong>${episode. air_date}</strong></span>`;

    //appends elements to another
    charDiv.append(epName);
    charDiv.append(epAirDate);
    charDiv.append(descOfCarDiv);
    epList.append(charDiv);
    charDiv.append(mainImageContainer);
    episodeDisplay.append(epList);
};
                    //SECTION 2: IMAGES OF CHARACTERS FROM THE SHOW
//get the characters
async function getCharacters() {
    try {
        characterList.innerHTML = ''; //resets the HTML for characterList
        let response = await fetch(URL+characterUrl);
        let res = await response.json();
        let array = res.results;
        array.forEach(char => createTheCharacters(char));
    } catch (error){
        console.error("Failed to fetch characters:", error);
        characterList.innerHTML = `<p class="error">Unable to load characters. Please try again later.</p>`;
    };
};

//displays character
function createTheCharacters(char) {
    //for container
    let mainContainer = document.createElement('div');
    mainContainer.classList.add('main-container');

    //for image
    let charImage = document.createElement('img');
    charImage.classList.add('char-image');

    //for details div
    let detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    detailsContainer.classList.add('hidden');

    //for character name
    let charName = document.createElement('p');
    charName.classList.add('char-name');

    //for gender, species,status,location, origin
    let gender = document.createElement('p');
    let species = document.createElement('p');
    let status = document.createElement('p');
    let location = document.createElement('p');
    let origin = document.createElement('p');

    //fills the created elements with content
    charName.textContent = `${char. name}`;
    gender.innerHTML = `<span>Gender:</span>${char. gender}`;    
    location.innerHTML = `<span>Location: </span>${char. location.name}`;    
    origin.innerHTML = `<span>Origins:</span> ${char. origin.name}`;
    species.innerHTML = `<span>Species: </span>${char. species}`;    
    status.innerHTML = `<span>Status: </span>${char. status}`;  
    charImage.src = `${char. image}`;
   
    //appends elements to their respective elements
    detailsContainer.append(charName);
    detailsContainer.append(gender);
    detailsContainer.append(species);
    detailsContainer.append(status);
    detailsContainer.append(location);
    detailsContainer.append(origin);

    //appends to the major container elements
    mainContainer.append(charImage);
    mainContainer.append(detailsContainer);
    characterList.append(mainContainer);

    //event listener for revealing details on characters selected
    charImage.addEventListener('click',()=>{
        detailsContainer.classList.toggle('hidden');
    });
};
            //PAGE BUTTON EVENT LISTENERS
//event listener for the character pages buttons
//for page 1
characterPage1.addEventListener('click', () => {
    characterUrl = 'character';
    getCharacters();
});

//for page 2
characterPage2.addEventListener('click', () => {
    characterUrl = 'character?page=2';
    getCharacters();
});

//for page 3
characterPage3.addEventListener('click', () => {
    characterUrl = 'character?page=3';
    getCharacters();
});

//for page 4
characterPage4.addEventListener('click', () => {
    characterUrl = 'character?page=4';
    getCharacters();
});

//for page 5
characterPage5.addEventListener('click', () => {
    characterUrl = 'character?page=5';
    getCharacters();
});

//for page 6
characterPage6.addEventListener('click', () => {
    characterUrl = 'character?page=6';
    getCharacters();
});

            //LIGHT / DARK MODE EVENT LISTENER
//listens for dark to light mode and vice versa
mode.addEventListener('click', () => {
    toggleModes();
});
//used to toggle dark and light
const toggleModes = () => {
    if (light.classList.toggle('dark')) {
        //styles body background to dark mode
        document.body.style.backgroundColor = '#0E1A2B';
        //styles episode-container to dark mode
        episodeContainer.style.backgroundColor = '#1B263B';
        episodeContainer.style.color = 'white';
        //styles episode-display to dark mode
        episodeDisplay.style.backgroundColor = ' #1D2951';
        episodeDisplay.style.color = '#F0F4FF';
        //styles the words 'character section' to dark mode
        charSection.style.color = 'white'
    } else {
        //styles body background to light mode
        document.body.style.backgroundColor = 'rgb(235, 235, 235)';
        //styles episode-container to light mode
        episodeContainer.style.backgroundColor = ' rgb(235, 235, 235)';
        episodeContainer.style.color = 'black';
        //styles episode-display to light mode
        episodeDisplay.style.backgroundColor = ' white';
        episodeDisplay.style.color = 'black';
        //styles the words 'character section' to light mode
        charSection.style.color = 'black';
    };
};

