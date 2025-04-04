import React, { useEffect, useState } from "react";
import Model, { ModelProps } from "../components/Model";
import { fetchCarModels, createCarModel } from "../services/api";
import ModelForm from "../components/ModelForm";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";

const CarModelsPage: React.FC = () => {
    const [models, setModels] = useState<ModelProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const data = await fetchCarModels();
                setModels(data.content);
                setLoading(false);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : 'Failed to load car models');
                setLoading(false);
            }
        };
        loadModels();
    }, []);

    const handleAddModel = async (modelData: Omit<ModelProps, 'id'>) => {
        try {
            const newModel = await createCarModel(modelData);
            setModels([...models, newModel]);
            setShowForm(false);
            setError(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to create car model');
        }
    };

    const handleModelUpdated = (updatedModel: ModelProps) => {
        setModels(models.map(model =>
            model.id === updatedModel.id ? updatedModel : model
        ));
    };

    const handleModelDeleted = (deletedId: number) => {
        setModels(models.filter(model => model.id !== deletedId));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert message={error} onClose={() => setError(null)} />;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Car Models</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : 'Add New Model'}
                </button>
            </div>

            {showForm && (
                <ModelForm
                    initialData={{
                        brand: '',
                        model: '',
                        year: 2023,
                        luggageCapacity: 0,
                        fuelType: 'petrol',
                        transmission: 'manual',
                        pricePerDay: 0,
                        airConditioning: false,
                        infotainmentSystem: false,
                        safetyRating: 0
                    }}
                    onSubmit={handleAddModel}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="row">
                {models.map((model) => (
                    <div key={model.id} className="col-md-6 mb-4">
                        <Model
                            {...model}
                            onModelUpdated={handleModelUpdated}
                            onModelDeleted={handleModelDeleted}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarModelsPage;