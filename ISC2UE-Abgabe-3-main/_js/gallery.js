"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
  const links = document.querySelectorAll(".card-link");
  const randomIndex = getRandomInt(0, links.length);
  const randomLink = links[randomIndex];
  switchFullImage(randomLink.href, randomLink.querySelector("img").alt);
  randomLink.parentElement.classList.add("bg-dark", "text-white");
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
  const links = document.querySelectorAll(".card-link");

  function handleLinkClick(event) {
    event.preventDefault();

    const currentLink = event.target;
    const currentCard = currentLink.parentElement;
    const fullImageUrl = currentLink.currentSrc.replace("_thumb","");
    const imageDescription = loadNotes(fullImageUrl);

    document.querySelector(".bg-dark.text-white").classList.remove("bg-dark", "text-white");
    currentCard.parentElement.classList.add("bg-dark", "text-white");

    switchFullImage(fullImageUrl, imageDescription);
    

  }

  links.forEach(link => link.addEventListener("click", handleLinkClick));
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
  const notesField = document.getElementById("notes");

  function handleNotesBlur() {
    const notesField = document.getElementById("notes");
    const notes = notesField.getInnerHTML();
    const fullImageUrl = document.querySelector(".figure-img").src;

    if (notes) {
      localStorage.setItem(fullImageUrl, notes);
    } else {
      localStorage.removeItem(fullImageUrl);
    }
  }

  notesField.addEventListener("blur", handleNotesBlur);
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
  const fullImage = document.querySelector(".figure-img");
  fullImage.src = imageUrl.replace("_thumb","");
  fullImage.alt = imageDescription;
  document.querySelector(".figure-caption").textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
  const notesField = document.getElementById("notes");
  const notes = localStorage.getItem(key) || "Enter your notes here!";
  notesField.innerHTML = notes;
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
