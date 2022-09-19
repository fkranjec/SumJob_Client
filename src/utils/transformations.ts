export const getAddressObject = (address_components) => {
    console.log(address_components);
    var ShouldBeComponent = {
        postalCode: ["postal_code"],
        street: ["street_address", "route"],
        streetNumber: ["street_number"],
        state: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
        ],
        city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
        ]
    };

    var address = {
        streetNumber: "",
        postalCode: "",
        street: "",
        state: "",
        city: "",
    };
    address_components.forEach(component => {
        for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                if (shouldBe === "country") {
                    address[shouldBe] = component.long_name;
                } else {
                    address[shouldBe] = component.long_name;
                }
            }
        }
    });
    return address;
}
