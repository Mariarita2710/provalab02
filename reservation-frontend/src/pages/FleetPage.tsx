import React, { useEffect, useState } from "react";
import Vehicle, { VehicleProps } from "../components/Vehicle";
import { fetchVehicles , fetchCarModels, createVehicle} from "../services/api.ts";
import VehicleForm from "../components/VehicleForm";

const FleetPage: React.FC = () => {
    const [vehicles, setVehicles] = useState<VehicleProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [carModels, setCarModels] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [vehiclesData, modelsData] = await Promise.all([
                    fetchVehicles(),
                    fetchCarModels(0, 100) // Get all models for dropdown
                ]);
                setVehicles(vehiclesData.content);
                setCarModels(modelsData.content);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleAddVehicle = async (vehicleData: any) => {
        try {
            const newVehicle = await createVehicle(vehicleData);
            setVehicles([...vehicles, newVehicle]);
            setShowForm(false);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Fleet Management</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Add New Vehicle'}
                </button>
            </div>

            {showForm && (
                <VehicleForm
                    onSubmit={handleAddVehicle}
                    carModels={carModels}
                />
            )}

            <div className="row">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="col-md-6 mb-4">
                        <Vehicle {...vehicle} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetPage;