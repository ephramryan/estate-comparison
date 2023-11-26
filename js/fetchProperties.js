import { selectedProperties, updateComparedProperties } from "./main.js";

export async function fetchProperties() {
  try {
    const response = await fetch(
      "https://estate-comparison.codeboot.cz/list.php"
    );
    const data = await response.json();

    const propertiesContainer = document.querySelector(
      ".properties__container"
    );

    data.forEach((property) => {
      const id = property.id;
      const nameExtracted = property.name_extracted;
      const locality = property.locality;
      const firstImage = property.images[0];

      const propertyContainer = document.createElement("div");
      propertyContainer.classList.add("property__container");

      const thumbnail = document.createElement("img");
      thumbnail.classList.add("property__thumbnail");
      thumbnail.src = firstImage;

      const descriptionContainer = document.createElement("div");
      descriptionContainer.classList.add("property__description__container");

      const description = document.createElement("p");
      description.classList.add("property__description");
      description.textContent = `${nameExtracted}, ${locality}`;

      descriptionContainer.appendChild(description);

      propertyContainer.appendChild(thumbnail);
      propertyContainer.appendChild(descriptionContainer);

      propertiesContainer.appendChild(propertyContainer);

      propertyContainer.addEventListener("click", () => {
        propertyContainer.classList.toggle("selected");

        if (propertyContainer.classList.contains("selected")) {
          selectedProperties.push({
            id: id,
            propertyContainer: propertyContainer,
          });
        } else {
          const index = selectedProperties.findIndex(
            (selectedProperty) => selectedProperty.id === id
          );
          if (index !== -1) {
            selectedProperties.splice(index, 1);
          }
        }

        if (selectedProperties.length > 2) {
          // unselect the first property
          selectedProperties[0].propertyContainer.classList.remove("selected");
          // shift the selection
          selectedProperties.shift();
        }

        updateComparedProperties(data);
      });
    });

    // returns the fetched data for use in other modules
    return data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
}
