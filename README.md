# Rick and Morty API

## Introduction

A JavaScript-based web application project that interacts with  a [Rick and Morty API](https://rickandmortyapi.com/) to display information in 2 sections.

The first section displays information of episode chosen from a select option input field.
Such information include;
    -episode name
    -air date
    -characters that show up in that episode.

The second section displays information of various characters chosen by clicking their respective images.
Such information include; 
    -character name
    -gender
    -species
    -status
    -location
    -origins. 

## Table of content
1. Features
2. Technologies used
3. Project structure
4. Installation
5. How to use
6. Key functions
7. Event listeners/handlers
8. Error handling
9. API reference
10. Future enhancement
11. License

## Features

**Episode information**
The application fetches episodes from the API.
It organizes episodes into three paginated dropdown menus.
It displays a list details on selected episode such as;
    -name
    -air date
    -characters who appeared on the episode.

**Character information**
The application fetches characters details from the API.
It displays characters from the show with their details like;
    -image
    -name
    -gender
    -species
    -status
    -location
    -origin.

**Dynamic dropdowns**
It features three dropdown menu for episode selection
It fetches and displays episodes dynamically across multiple pages.

**Light and dark mode**
There is a dark/light button that toggles between light and dark themes.
The UI styling targeted are;
    -background colors
    -text colors
    -component themes

**Character pages**
There are a total of 6 pages from which you can view characters.
For each page you select, new characters are fetched and displayed.
This allows for more dynamic fetching of data for each page with dedicated buttons.

**Episode pages(dropdowns)**
There are three dropdown menus for episode selection.
They fetch and list episodes based on the selected page.
Upon selection of an episode, they update displayed episode upon selection

**Interactive UI**
In order to reveal character details the user is to click on the character's image to reveal more details.

**Error handling**
The application implements error handling for failed API requests.
It displays user-friendly error messages for failed data fetches.

## Technologies used

1. HTML
2. CSS
3. JavaScript
4. Rick and Morty API ---> (https://rickandmortyapi.com/)

## Project structure

1. **`index.html`**: Contains the structure of the web application.
2. **`style.css`**: Provides styling for the application.
3. **`script.js`**: Main JavaScript file that handles data fetching, DOM manipulation, and event handling.
4. **`images folder`**: contains images used in the project

## Installation
  
To get access to the codes, you could fork and clone the repository using:
--->git clone 
Afterwards, navigate to the project folder and go live with the index.html file in your preferred browser.

## How to use

### **1. Viewing episodes**

#### **Step 1: Select an episode**

In the episode section, navigate to the dropdown menus.
You will find three dropdowns that are available for different pages of episodes:
    -**Page 1** contains the first set of episodes.
    -**Page 2** contains the second set of episodes.
    -**Page 3** contains the third set of episodes.

#### **Step 2: display episode details**
On any drop down menu, select any episode of choice.
The details of the selected episode will appear, including:
    -**Name** of the episode.
    -**Air date** of the episode.
    -**Characters** featured in the episode.

### **2. Viewing characters**

#### **Step 1: Explore Characters**
Under the character details, various characters featured in the show are displayed as a grid of images.
By clicking on a character's image, you are able to view additional details such as:
    -Name
    -gender
    -species
    -status
    -location
    -origin.

#### **Step 2: Navigate character pages**
Under the "Characters" section, there are six page buttons are available:
    -**Page 1**
    -**Page 2**
    -**Page 3**
    -**Page 4**
    -**Page 5**
    -**Page 6**
You are required to click on a page button to load the respective set of characters.

### **3. Switching themes**

#### **Step 1: Light/Dark Mode Toggle**
A button for switching dark/light mode is provided at the top right button
Use the button to switch between light and dark themes.
The theme applies to:
    -Background colors.
    -Text colors.
    -Component styles.

### **Tips**
1. Use the dropdown menus and navigation buttons for easy exploration.
2. Toggle themes to enhance readability based on your preference.
3. Click on images or select options to reveal more information dynamically.

## Key functions

### **1. Episode functions**

#### **1.1 showFirstEpisode()**
The function displays details of the first episode when the page loads.
It fetches data from the API endpoint `https://rickandmortyapi.com/api/episode`.
It selects the first episode in the results and displays its details.

#### **1.2 dropdown(page)**
The function populates the dropdown menus with episode options for the specified page by calling their respective functions.
It accepts a page parameter (1, 2 or 3)
It calls `dropDownFetch` to fetch episodes for the given page and appends them as options in the corresponding dropdown menu.

#### **dropDownFetch(episodeURL, pageList)**
The function fetches episode data from its given URL.
It then populates the dropdown menu with options.

#### **1.4 displayPage(episode)**
These functions add episode options to the dropdown menus for pages 1, 2, and 3.
This by creating an `<option>` element with the episode's ID and code.
It then returns it back.

#### **1.5 handleSelect(episodeId, page)**
The function fetches and displays details of the selected episode by calling another function `displayEpisode(episode)`.
It determines the page source of the selected episode and fetches data for that page by identifying the selected episode by its ID.

#### **1.6 displayEpisode(episode)**
The function displays the detailed information for a selected episode.
It first clears the existing episode display before showing the episode's name, air date and a list of characters.
It then fetches and then displays the episode's name, air date and associated characters.

### **2. Character functions**

#### **2.1 getCharacters()**
The function fetches and displays a list of characters for the current character page.
It first fetches characters from the API endpoint.
It then dynamically generates and displays character cards including images and basic details by calling a function `createTheCharacters(char)`

#### **2.2 createTheCharacters(char)**
The function creates and appends a card for a single character.
It first creates elements for character image and details (name, gender, species, status, location, origin).
It then appends these elements to the main character container.
Finally a click event listener is added to toggle the visibility of the character's details.

#### **2.3 addsToFavorite(char)**
The function takes in an object that was passed from an event click listener of like.
The function appends the object received to a favoriteArray list and creates elements for it to be appended in the DOM.

#### **2.4 removesFromFavorite(char)**
The function takes in an object that was passed from an event click listener of unlike.
The function pops the object from a favoriteArray list and removes its elements from the DOM.


### **3. Utility functions**

#### **3.1 toggleModes()**
The purpose of this function is to toggles between light and dark themes.
This is by changing the background and text colors for the body, episode container and episode display based on the current mode.

## **4. Event listeners/handlers**

### **4.1 DOMContentLoaded**
This ensures that initial functions run after the DOM is fully loaded.
The functions triggered are;
    -showFirstEpisode()
    -dropdown(page = 1)
    -dropdown(page = 2)
    -dropdown(page = 3)
    -getCharacters()

### **4.2 Dropdown change events**
This updates the episode details when a user selects a new episode from the dropdown.
It calls the function `handleSelect()` with the selected episode ID and page number.

### **4.3 Character Page Buttons**
This updates the displayed characters based on the selected page.
It calls `getCharacters()` with the appropriate API endpoint.

## **5. Error handling**

### **Error Scenarios:**
Fetch failure during API calls.
Invalid data returned by the API.

### **Implementation:**
`catch()` blocks log errors and display fallback messages.
Example: In `getCharacters()`, an error message is displayed in the character list.

## API reference
Base URL: https://rickandmortyapi.com/api/
Endpoints:
---> episodes: https://rickandmortyapi.com/api/episode
---> characters: https://rickandmortyapi.com/api/character

## Future enhancements

Add search functionality for episodes and characters.
Enhance UI/UX with animations and responsive design.

## License

This project is a free open resource.
