export type VehicleProps = {
    carModelId: number;
    id: number;
    licensePlate: string;
    vin: string;
    status: "available" | "rented"; // Tipi specifici
    mileage: number;
    notes?: string; // Opzionale
};

export default function Vehicle({ licensePlate, vin, status, mileage, notes }: VehicleProps) {
    return (
        <div>
            <h2>Vehicle: {licensePlate}</h2>
            <p>VIN: {vin}, Status: {status}, Mileage: {mileage} km</p>
            {notes && <p>Notes: {notes}</p>}
        </div>
    );
}
