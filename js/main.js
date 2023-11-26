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
    function scrollLeft() {
      const container = document.querySelector(".properties__container");
      container.scrollLeft -= 200; // adjust scroll distance here
    }
    function scrollRight() {
      const container = document.querySelector(".properties__container");
      container.scrollLeft += 200; // adjust scroll distance here
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
