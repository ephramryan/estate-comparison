import { selectedProperties } from "./main.js";
import { createComparedPropertyElement } from "./createComparedPropertyElement.js";

export function updateComparedProperties(data) {
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
