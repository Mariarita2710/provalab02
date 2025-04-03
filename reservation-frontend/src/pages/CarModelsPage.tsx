import React from "react";
import Model, { ModelProps } from "../components/Model";

const CarModelsPage: React.FC = () => {
    const models: ModelProps[] = [
        { id: 1, brand: "Toyota", model: "Corolla", year: 2023, segment: "Sedan", doors: 4, seats: 5, fuelType: "hybrid", transmission: "automatic", pricePerDay: 50 },
        { id: 2, brand: "Ford", model: "Focus", year: 2022, segment: "Hatchback", doors: 5, seats: 5, fuelType: "petrol", transmission: "manual", pricePerDay: 40 }
    ];

    return (
        <div>
            <h1>Car Models</h1>
            {models.map((model) => (
                <Model key={model.id} {...model} />
            ))}
        </div>
    );
};

export default CarModelsPage;
