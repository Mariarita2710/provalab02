import React, { useEffect, useState } from "react";
import Vehicle, { VehicleProps } from "../components/Vehicle";
import { fetchVehicles, fetchCarModels, createVehicle } from "../services/api";
import VehicleForm from "../components/VehicleForm";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";

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
                    fetchCarModels(0, 100)
                ]);

                // Enhance vehicles with model details
                const enhancedVehicles = vehiclesData.content.map(vehicle => ({
                    ...vehicle,
                    modelDetails: modelsData.content.find(model => model.id === vehicle.carModelId)
                }));

                setVehicles(enhancedVehicles);
                setCarModels(modelsData.content);
                setLoading(false);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleAddVehicle = async (vehicleData: Omit<VehicleProps, 'id'>) => {
        try {
            const newVehicle = await createVehicle(vehicleData);
            // Add model details to the new vehicle
            const modelDetails = carModels.find(model => model.id === vehicleData.carModelId);
            setVehicles([...vehicles, { ...newVehicle, modelDetails }]);
            setShowForm(false);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to create vehicle');
        }
    };

    const handleVehicleUpdated = (updatedVehicle: VehicleProps) => {
        setVehicles(vehicles.map(vehicle =>
            vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
        ));
    };

    const handleVehicleDeleted = (deletedId: number) => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== deletedId));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} onClose={() => setError(null)} />;

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
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="row">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="col-md-6 mb-4">
                        <Vehicle
                            {...vehicle}
                            onVehicleUpdated={handleVehicleUpdated}
                            onVehicleDeleted={handleVehicleDeleted}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetPage;