import { fetchProperties } from "./fetchProperties.js";
import { updateComparedProperties } from "./updateComparedProperties.js";

// below array stores selected properties for manipulation
export let selectedProperties = [];

// export this function for use in fetchProperties.js
export { updateComparedProperties };

fetchProperties()
  .then((data) => {
    // access to fetched data obtained

    // function for resetting the selected properties
    function resetSelection() {
      selectedProperties.forEach((selectedProperty) => {
        selectedProperty.propertyContainer.classList.remove("selected");
      });
      selectedProperties = [];
      updateComparedProperties(data);
    }

    // START: scrolling functions
    // check if device is a mobile device
    function isMobile() {
      return window.innerWidth <= 600; // adjust screen width here
    }
    function scrollLeft() {
      const container = document.querySelector(".properties__container");
      const scrollDistance = isMobile() ? 1000 : 3000; // adjust scroll distance here
      container.scrollLeft -= scrollDistance;
    }
    function scrollRight() {
      const container = document.querySelector(".properties__container");
      const scrollDistance = isMobile() ? 1000 : 3000; // adjust scroll distance here
      container.scrollLeft += scrollDistance;
    }
    // event listeners for scroll buttons
    document
      .getElementById("scrollLeftButton")
      .addEventListener("click", scrollLeft);
    document
      .getElementById("scrollRightButton")
      .addEventListener("click", scrollRight);
    // END: scrolling functions

    // event listener for reset button
    document
      .getElementById("resetButton")
      .addEventListener("click", resetSelection);
  })
  .catch((error) => {
    console.error("Error in main.js:", error);
  });
