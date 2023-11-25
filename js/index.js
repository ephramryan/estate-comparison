let data;

async function fetchProperties() {
  try {
    const response = await fetch(
      "https://estate-comparison.codeboot.cz/list.php"
    );
    data = await response.json();

    const propertiesContainer = document.querySelector(
      ".properties__container"
    );

    data.forEach((property) => {
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

        const selectedProperties = document.querySelectorAll(
          ".property__container.selected"
        );
        if (selectedProperties.length > 2) {
          const lastSelected =
            selectedProperties[selectedProperties.length - 1];
          lastSelected.classList.remove("selected");
        }

        updateComparedProperties();
      });
    });
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
}

// function to update compared properties
function updateComparedProperties() {
  const comparedPropertiesContainer = document.querySelector(
    ".compare-properties__container"
  );
  comparedPropertiesContainer.innerHTML = "";

  const selectedProperties = document.querySelectorAll(
    ".property__container.selected"
  );

  selectedProperties.forEach((property) => {
    const name = property
      .querySelector(".property__description")
      .textContent.split(",")[0];
    // find the fetched data for the selected property by name_extracted
    const selectedPropertyData = data.find(
      (property) => property.name_extracted === name
    );

    if (selectedPropertyData) {
      const name2 = selectedPropertyData.name;
      const price = selectedPropertyData.prize_czk;
      const locality = selectedPropertyData.locality;
      const buildingArea = selectedPropertyData.building_area;
      const landArea = selectedPropertyData.land_area;
      const companyName = selectedPropertyData.company_name;
      const companyLogo = selectedPropertyData.company_logo;

      const comparedPropertyContainer = document.createElement("div");
      comparedPropertyContainer.classList.add("compared-property__container");

      const thumbnail = document.createElement("img");
      thumbnail.classList.add("property__thumbnail");
      thumbnail.src = property.querySelector(".property__thumbnail").src;

      const nameElement = document.createElement("p");
      nameElement.textContent = name2;

      const priceElement = document.createElement("p");
      priceElement.textContent = `Price: ${price}`;

      const localityElement = document.createElement("p");
      localityElement.textContent = `Locality: ${locality}`;

      const buildingAreaElement = document.createElement("p");
      buildingAreaElement.textContent = `Building Area: ${buildingArea}`;

      const landAreaElement = document.createElement("p");
      landAreaElement.textContent = `Land Area: ${landArea}`;

      const companyContainer = document.createElement("div");
      companyContainer.classList.add("property_company__container");

      if (companyLogo) {
        const companyLogoElement = document.createElement("img");
        companyLogoElement.classList.add("property_company__logo");
        companyLogoElement.src = companyLogo;
        companyContainer.appendChild(companyLogoElement);
      }

      const companyNameElement = document.createElement("p");
      companyNameElement.classList.add("property_company__name");
      companyNameElement.textContent = `Company: ${companyName}`;

      companyContainer.appendChild(companyNameElement);

      comparedPropertyContainer.appendChild(thumbnail);
      comparedPropertyContainer.appendChild(nameElement);
      comparedPropertyContainer.appendChild(priceElement);
      comparedPropertyContainer.appendChild(localityElement);
      comparedPropertyContainer.appendChild(buildingAreaElement);
      comparedPropertyContainer.appendChild(landAreaElement);
      comparedPropertyContainer.appendChild(companyContainer);

      comparedPropertiesContainer.appendChild(comparedPropertyContainer);
    }
  });
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

// fetch properties data
fetchProperties();
