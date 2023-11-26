let data;
let selectedProperties = [];

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

        updateComparedProperties();
      });
    });
  } catch (error) {
    console.error("Error fetching property data:", error);
  }
}

function updateComparedProperties() {
  const comparedPropertiesContainer = document.querySelector(
    ".compare-properties__container"
  );
  comparedPropertiesContainer.innerHTML = "";

  if (selectedProperties.length === 2) {
    const property1 = selectedProperties[0];
    const property2 = selectedProperties[1];

    // find the fetched data for the selected properties by id
    const selectedPropertyData1 = data.find(
      (property) => property.id === property1.id
    );
    const selectedPropertyData2 = data.find(
      (property) => property.id === property2.id
    );

    if (selectedPropertyData1 && selectedPropertyData2) {
      const price1 = selectedPropertyData1.prize_czk;
      const price2 = selectedPropertyData2.prize_czk;
      const buildingArea1 = selectedPropertyData1.building_area;
      const buildingArea2 = selectedPropertyData2.building_area;
      const landArea1 = selectedPropertyData1.land_area;
      const landArea2 = selectedPropertyData2.land_area;

      const comparedPropertyContainer1 = createComparedPropertyElement(
        property1.propertyContainer,
        selectedPropertyData1,
        price1,
        buildingArea1,
        landArea1,
        0
      );
      const comparedPropertyContainer2 = createComparedPropertyElement(
        property2.propertyContainer,
        selectedPropertyData2,
        price2,
        buildingArea2,
        landArea2,
        1
      );

      comparedPropertiesContainer.appendChild(comparedPropertyContainer1);
      comparedPropertiesContainer.appendChild(comparedPropertyContainer2);

      // compare prices, building and land areas and set background color/font color
      const priceElement1 =
        comparedPropertyContainer1.querySelector(".property__price");
      const buildingAreaElement1 = comparedPropertyContainer1.querySelector(
        ".property__building-area"
      );
      const landAreaElement1 = comparedPropertyContainer1.querySelector(
        ".property__land-area"
      );
      const priceElement2 =
        comparedPropertyContainer2.querySelector(".property__price");
      const buildingAreaElement2 = comparedPropertyContainer2.querySelector(
        ".property__building-area"
      );
      const landAreaElement2 = comparedPropertyContainer2.querySelector(
        ".property__land-area"
      );

      const numericPrice1 = parseFloat(price1);
      const numericPrice2 = parseFloat(price2);
      const numericBuildingArea1 = parseFloat(buildingArea1);
      const numericBuildingArea2 = parseFloat(buildingArea2);
      const numericLandArea1 = parseFloat(landArea1);
      const numericLandArea2 = parseFloat(landArea2);

      if (numericPrice1 > numericPrice2) {
        priceElement1.style.backgroundColor = "#FF0000";
        priceElement2.style.backgroundColor = "#006400";
        priceElement2.style.color = "#FFFFFF";
      } else {
        priceElement1.style.backgroundColor = "#006400";
        priceElement1.style.color = "#FFFFFF";
        priceElement2.style.backgroundColor = "#FF0000";
      }

      if (numericBuildingArea1 < numericBuildingArea2) {
        buildingAreaElement1.style.backgroundColor = "#FF0000";
        buildingAreaElement2.style.backgroundColor = "#006400";
        buildingAreaElement2.style.color = "#FFFFFF";
      } else {
        buildingAreaElement1.style.backgroundColor = "#006400";
        buildingAreaElement1.style.color = "#FFFFFF";
        buildingAreaElement2.style.backgroundColor = "#FF0000";
      }

      if (numericLandArea1 < numericLandArea2) {
        landAreaElement1.style.backgroundColor = "#FF0000";
        landAreaElement2.style.backgroundColor = "#006400";
        landAreaElement2.style.color = "#FFFFFF";
      } else {
        landAreaElement1.style.backgroundColor = "#006400";
        landAreaElement1.style.color = "#FFFFFF";
        landAreaElement2.style.backgroundColor = "#FF0000";
      }
    }
  }
}

function createComparedPropertyElement(
  property,
  selectedPropertyData,
  price,
  building_area,
  land_area,
  index
) {
  const comparedPropertyContainer = document.createElement("div");
  comparedPropertyContainer.classList.add("compared-property__container");

  const thumbnail = document.createElement("img");
  thumbnail.classList.add("property__thumbnail");
  thumbnail.src = property.querySelector(".property__thumbnail").src;

  const propertyDescription = document.createElement("div");
  propertyDescription.classList.add(
    "compared-property_descriptions__container"
  );

  const nameElement = document.createElement("p");
  nameElement.classList.add("property__name");
  nameElement.innerHTML = `<strong>${selectedPropertyData.name}</strong>`;

  const priceElement = document.createElement("p");
  priceElement.innerHTML = `<strong>Price:</strong> ${price}`;
  priceElement.classList.add("property__price");

  const localityElement = document.createElement("p");
  localityElement.innerHTML = `<strong>Locality:</strong> ${selectedPropertyData.locality}`;

  const buildingAreaElement = document.createElement("p");
  buildingAreaElement.innerHTML = `<strong>Building Area:</strong> ${selectedPropertyData.building_area}`;
  buildingAreaElement.classList.add("property__building-area");

  const landAreaElement = document.createElement("p");
  landAreaElement.innerHTML = `<strong>Land Area:</strong> ${selectedPropertyData.land_area}`;
  landAreaElement.classList.add("property__land-area");

  const companyContainer = document.createElement("div");
  companyContainer.classList.add("property_company__container");

  if (selectedPropertyData.company_logo) {
    const companyLogoElement = document.createElement("img");
    companyLogoElement.classList.add("property_company__logo");
    companyLogoElement.src = selectedPropertyData.company_logo;
    companyContainer.appendChild(companyLogoElement);
  } else {
    companyContainer.classList.add("property_company__container-noLogo");
  };

  const companyNameElement = document.createElement("p");
  companyNameElement.classList.add("property_company__name");
  companyNameElement.innerHTML = `<strong>Company:</strong> ${
    selectedPropertyData.company_name
      ? selectedPropertyData.company_name
      : "unknown"
  }`;
  companyContainer.appendChild(companyNameElement);

  comparedPropertyContainer.appendChild(thumbnail);

  propertyDescription.appendChild(nameElement);
  propertyDescription.appendChild(priceElement);
  propertyDescription.appendChild(localityElement);
  propertyDescription.appendChild(buildingAreaElement);
  propertyDescription.appendChild(landAreaElement);
  propertyDescription.appendChild(companyContainer);

  comparedPropertyContainer.appendChild(propertyDescription);

  return comparedPropertyContainer;
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

// event listener for the reset button
document
  .getElementById("resetButton")
  .addEventListener("click", resetSelection);

// function to reset the selected properties
function resetSelection() {
  selectedProperties.forEach((selectedProperty) => {
    selectedProperty.propertyContainer.classList.remove("selected");
  });
  selectedProperties = [];
  updateComparedProperties();
}

// fetch properties data
fetchProperties();