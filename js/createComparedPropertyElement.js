// below function generates property HTML structure for comparison section upon selection
export function createComparedPropertyElement(
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
propertyDescription.classList.add("compared-property_descriptions__container");

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
}

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