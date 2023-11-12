import { makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';
import { auth } from '../config/firebase';
import userStore from './UserStore';
import swal from 'sweetalert';
import { Marker } from '../utils/Marker';
import systemStore from './SystemStore';

// const baseUrl = 'https://rr-waze-final-project.uc.r.appspot.com/system';
const baseUrl = 'http://localhost:3333/marker';

const getHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        Authorization: `Bearer ${token}`
    }
}

const addMarker = async (marker: Marker) => {
    try {
        const headers = await getHeaders();
        const res = await axios.post(baseUrl, marker, {
            headers: headers,
        });
        return res.data;
    } catch (error) { console.log(error); }
}

const getMarkersBySystemId = async (systemId: string) => {
    try {
        const res = await axios.get(`${baseUrl}/systemsMarkers/${systemId}`);
        return res.data;
    } catch (error) { console.log(error); }
}


const getMarkerById = async (markerId: string) => {
    try {
        const headers = await getHeaders();
        const res = await axios.get(`${baseUrl}/${markerId}`, {
            headers: headers,
        });

        return res.data;
    } catch (error) { console.log(error); }
}

const updateMarker = async (marker: Marker) => {
    const headers = await getHeaders();
    const res = await axios.put(`${baseUrl}/${marker._id}`, marker, {
        headers: headers,
    });
    return res.data;
}

const deleteMarker = async (markerId: string) => {
    const headers = await getHeaders();
    const res = await axios.delete(`${baseUrl}/${markerId}`, {
        headers: headers,
    });
    return res.data;
}

class Store {
    markers: Marker[] = [];
    currentMarker: Marker | null = null;
    autoCompleteMarker: { lat: number, lng: number } = { lat: 0, lng: 0 };

    constructor() {
        makeAutoObservable(this);
    }

    async getMarkersBySystemId() {
        if (systemStore.currentSystem?._id) {
            this.markers = await toJS(getMarkersBySystemId(systemStore.currentSystem?._id));
        }
        else swal("Please choose a system!",
            "you can't get markers of any system!",
            "error");
    }

    async getMarkerById(markerId: string) {
        this.currentMarker = await getMarkerById(markerId);
    }

    async addMarker(marker: Marker) {
        if (systemStore.currentSystem && userStore.user) {
            marker.system_id = systemStore.currentSystem?._id || '';
            marker.manager_id = userStore.user?.fireBaseUId || '';
            const markerAdded = await addMarker(marker);
            this.markers.push(markerAdded);
            this.currentMarker = markerAdded;
        }
        else swal("Please Login!",
            "you can't make a system before login!",
            "error");
    }

    async updateMarker(marker: Marker) {
        this.currentMarker = await updateMarker(marker);
    }

    async removeMarker(markerId: string) {
        await deleteMarker(markerId);
    }

}
const markerStore = new Store();
export default markerStore;