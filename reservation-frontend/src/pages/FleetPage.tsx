import React from "react";
import Vehicle, { VehicleProps } from "../components/Vehicle";

const FleetPage: React.FC = () => {
    const vehicles: VehicleProps[] = [
        { id: 1, licensePlate: "AB123CD", vin: "1HGCM82633A123456", status: "available", mileage: 12000 },
        { id: 2, licensePlate: "EF456GH", vin: "1HGCM82633A654321", status: "rented", mileage: 25000 }
    ];

    return (
        <div>
            <h1>Fleet Management</h1>
            {vehicles.map((vehicle) => (
                <Vehicle key={vehicle.id} {...vehicle} />
            ))}
        </div>
    );
};

export default FleetPage;
