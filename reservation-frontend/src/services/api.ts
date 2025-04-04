const API_BASE_URL = 'http://localhost:8080/api/v1';

// Helper function for common fetch operations
const fetchData = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
};

// Car Models API
export const fetchCarModels = async (
    page = 0,
    size = 10,
    filters: Record<string, string> = {}
) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...filters
    });
    return fetchData(`${API_BASE_URL}/models?${queryParams}`);
};

export const fetchCarModelDetails = async (id: number) => {
    return fetchData(`${API_BASE_URL}/models/${id}`);
};

export const createCarModel = async (modelData: any) => {
    return fetchData(`${API_BASE_URL}/models`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelData)
    });
};

export const updateCarModel = async (id: number, modelData: any) => {
    return fetchData(`${API_BASE_URL}/models/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelData)
    });
};

export const deleteCarModel = async (id: number) => {
    return fetchData(`${API_BASE_URL}/models/${id}`, {
        method: 'DELETE'
    });
};

// Vehicles API
export const fetchVehicles = async (
    page = 0,
    size = 10,
    filters: Record<string, string> = {}
) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...filters
    });
    return fetchData(`${API_BASE_URL}/vehicles?${queryParams}`);
};

export const fetchVehicleDetails = async (id: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${id}`);
};

export const createVehicle = async (vehicleData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
    });
};

export const updateVehicle = async (id: number, vehicleData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleData)
    });
};

export const partialUpdateVehicle = async (id: number, patchData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchData)
    });
};

export const deleteVehicle = async (id: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${id}`, {
        method: 'DELETE'
    });
};

// Maintenance Records API
export const fetchVehicleMaintenances = async (
    vehicleId: number,
    page = 0,
    size = 10,
    filters: Record<string, string> = {}
) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...filters
    });
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/maintenances?${queryParams}`);
};

export const fetchMaintenanceDetails = async (vehicleId: number, maintenanceId: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/maintenances/${maintenanceId}`);
};

export const createMaintenance = async (vehicleId: number, maintenanceData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/maintenances`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData)
    });
};

export const updateMaintenance = async (vehicleId: number, maintenanceId: number, maintenanceData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/maintenances/${maintenanceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceData)
    });
};

export const deleteMaintenance = async (vehicleId: number, maintenanceId: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/maintenances/${maintenanceId}`, {
        method: 'DELETE'
    });
};

// Notes API
export const fetchVehicleNotes = async (
    vehicleId: number,
    page = 0,
    size = 10,
    filters: Record<string, string> = {}
) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...filters
    });
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/notes?${queryParams}`);
};

export const fetchNoteDetails = async (vehicleId: number, noteId: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/notes/${noteId}`);
};

export const createNote = async (vehicleId: number, noteData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    });
};

export const updateNote = async (vehicleId: number, noteId: number, noteData: any) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    });
};

export const deleteNote = async (vehicleId: number, noteId: number) => {
    return fetchData(`${API_BASE_URL}/vehicles/${vehicleId}/notes/${noteId}`, {
        method: 'DELETE'
    });
};

// Utility function for handling paginated responses
export const getPaginatedData = (response: any) => {
    return {
        content: response.content || [],
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 0,
        pageNumber: response.number || 0,
        pageSize: response.size || 10,
        isFirst: response.first || false,
        isLast: response.last || false
    };
};

// Type definitions for API responses
export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    isFirst: boolean;
    isLast: boolean;
}

export interface CarModel {
    id: number;
    brand: string;
    model: string;
    year: number;
    segment: string;
    doors: number;
    seats: number;
    fuelType: string;
    transmission: string;
    pricePerDay: number;
    // Add other fields as needed
}

export interface Vehicle {
    id: number;
    licensePlate: string;
    vin: string;
    status: 'available' | 'rented' | 'maintenance';
    mileage: number;
    carModelId: number;
    carModel?: CarModel;
    notes?: string;
    // Add other fields as needed
}

export interface MaintenanceRecord {
    id: number;
    vehicleId: number;
    type: string;
    description: string;
    date: string;
    cost: number;
    // Add other fields as needed
}

export interface Note {
    id: number;
    vehicleId: number;
    author: string;
    content: string;
    createdAt: string;
    // Add other fields as needed
}