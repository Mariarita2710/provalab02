import React from 'react';
import { ModelProps } from './Model';

type ModelFormProps = {
    initialData: Partial<ModelProps>;
    onSubmit: (modelData: Omit<ModelProps, 'id'>) => void;
    onCancel: () => void;
};

const ModelForm: React.FC<ModelFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = React.useState({
        brand: initialData.brand || '',
        model: initialData.model || '',
        year: initialData.year || new Date().getFullYear(),
        segment: initialData.segment || 'Sedan',
        doors: initialData.doors || 4,
        seats: initialData.seats || 5,
        fuelType: initialData.fuelType || 'petrol',
        transmission: initialData.transmission || 'automatic',
        pricePerDay: initialData.pricePerDay || 50,
        luggageCapacity: initialData.luggageCapacity || 2,
        airConditioning: initialData.airConditioning ?? true,
        infotainmentSystem: initialData.infotainmentSystem ?? true,
        safetyRating: initialData.safetyRating || 5,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? checked
                : type === 'number'
                    ? Number(value)
                    : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const segments = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Minivan'];
    const fuelTypes = ['petrol', 'diesel', 'hybrid', 'electric'];
    const transmissions = ['automatic', 'manual'];
    const safetyRatings = [1, 2, 3, 4, 5];

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h3 className="card-title mb-4">{initialData.id ? 'Edit' : 'Add New'} Car Model</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Brand*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Model*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Year*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                min="2000"
                                max={new Date().getFullYear() + 1}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Segment*</label>
                            <select
                                className="form-select"
                                name="segment"
                                value={formData.segment}
                                onChange={handleChange}
                                required
                            >
                                {segments.map(segment => (
                                    <option key={segment} value={segment}>{segment}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Price/Day (€)*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="pricePerDay"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                min="0"
                                step="5"
                                required
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Doors*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="doors"
                                value={formData.doors}
                                onChange={handleChange}
                                min="2"
                                max="5"
                                required
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Seats*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="seats"
                                value={formData.seats}
                                onChange={handleChange}
                                min="2"
                                max="9"
                                required
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Luggage Capacity*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="luggageCapacity"
                                value={formData.luggageCapacity}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                required
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Safety Rating*</label>
                            <select
                                className="form-select"
                                name="safetyRating"
                                value={formData.safetyRating}
                                onChange={handleChange}
                                required
                            >
                                {safetyRatings.map(rating => (
                                    <option key={rating} value={rating}>{rating} ★</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Fuel Type*</label>
                            <select
                                className="form-select"
                                name="fuelType"
                                value={formData.fuelType}
                                onChange={handleChange}
                                required
                            >
                                {fuelTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Transmission*</label>
                            <select
                                className="form-select"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                required
                            >
                                {transmissions.map(trans => (
                                    <option key={trans} value={trans}>
                                        {trans.charAt(0).toUpperCase() + trans.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="airConditioning"
                                    checked={formData.airConditioning}
                                    onChange={handleChange}
                                    id="airConditioningCheck"
                                />
                                <label className="form-check-label" htmlFor="airConditioningCheck">
                                    Air Conditioning
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="infotainmentSystem"
                                    checked={formData.infotainmentSystem}
                                    onChange={handleChange}
                                    id="infotainmentCheck"
                                />
                                <label className="form-check-label" htmlFor="infotainmentCheck">
                                    Infotainment System
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            {initialData.id ? 'Update' : 'Save'} Model
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModelForm;