import React, { useState } from 'react';
import { deleteVehicle, updateVehicle } from '../services/api';
import VehicleForm from './VehicleForm';
import ErrorAlert from './ErrorAlert';

export type VehicleProps = {
    id: number;
    licensePlate: string;
    vin: string;
    status: "available" | "rented" | "maintenance";
    mileage: number;
    carModelId: number;
    notes?: string;
    modelDetails?: {
        brand?: string;
        model?: string;
        year?: number;
    };
    onVehicleUpdated?: (updatedVehicle: VehicleProps) => void;
    onVehicleDeleted?: (deletedId: number) => void;
};

const Vehicle: React.FC<VehicleProps> = ({
                                             id,
                                             licensePlate,
                                             vin,
                                             status,
                                             mileage,
                                             carModelId,
                                             notes,
                                             modelDetails,
                                             onVehicleUpdated,
                                             onVehicleDeleted
                                         }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async (updatedData: Omit<VehicleProps, 'id'>) => {
        try {
            const updatedVehicle = await updateVehicle(id, updatedData);
            setIsEditing(false);
            setError(null);

            if (onVehicleUpdated) {
                onVehicleUpdated({
                    id,
                    ...updatedData,
                    modelDetails // Preserve model details
                });
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to update vehicle');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete vehicle ${licensePlate}?`)) {
            return;
        }

        try {
            await deleteVehicle(id);
            setError(null);

            if (onVehicleDeleted) {
                onVehicleDeleted(id);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to delete vehicle');
        }
    };

    if (isEditing) {
        return (
            <div className="mb-4">
                {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
                <VehicleForm
                    initialData={{
                        licensePlate,
                        vin,
                        status,
                        mileage,
                        carModelId,
                        notes
                    }}
                    carModels={[]} // Will be filled by parent
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h2 className="card-title">Vehicle: {licensePlate}</h2>
                        <p className="card-text">
                            VIN: {vin}<br />
                            Status: <span className={`badge ${
                            status === 'available' ? 'bg-success' :
                                status === 'rented' ? 'bg-warning' : 'bg-secondary'
                        }`}>{status}</span><br />
                            Mileage: {mileage.toLocaleString()} km<br />
                            {modelDetails && (
                                <>Model: {modelDetails.brand} {modelDetails.model} ({modelDetails.year})<br /></>
                            )}
                            {notes && <>Notes: {notes}<br /></>}
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;