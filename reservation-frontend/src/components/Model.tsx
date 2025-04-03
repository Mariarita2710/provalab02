export type ModelProps = {
    id: number;
    brand: string;
    model: string;
    year: number;
    segment: string;
    doors: number;
    seats: number;
    fuelType: "hybrid" | "petrol" | "diesel" | "electric"; // Tipi specifici
    transmission: string;
    pricePerDay: number;
};

export default function Model({ brand, model, year, segment, doors, seats, fuelType, transmission, pricePerDay }: ModelProps) {
    return (
        <div>
            <h2>{brand} {model}</h2>
            <p>Year: {year}, Segment: {segment}, Doors: {doors}, Seats: {seats}</p>
            <p>Fuel: {fuelType}, Transmission: {transmission}, Price: {pricePerDay}€/day</p>
        </div>
    );
}
