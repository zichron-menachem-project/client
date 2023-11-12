export interface Marker {
    _id?: string;
    manager_id: string;
    system_id: string;
    locationGeolocation: {
        lat: number;
        lng: number;
    };
    description: string;
    name: string;
    notes: string;
    communicationDetails: {
        email: string;
        phone: string;
    };
}