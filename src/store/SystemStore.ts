import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { auth } from '../config/firebase';
import { System } from '../utils/System';
import userStore from './UserStore';
import swal from 'sweetalert';

// const baseUrl = 'https://rr-waze-final-project.uc.r.appspot.com/system';
const baseUrl = 'http://localhost:3333/system';

const getHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        Authorization: `Bearer ${token}`
    }
}

const addSystem = async (system: System) => {
    try {
        const headers = await getHeaders();  
        const res = await axios.post(baseUrl, system, {
            headers: headers,
        });
        return res.data;
    } catch (error) { console.log(error); }
}

const getAllSystems = async () => {
    try {
        const res = await axios.get(baseUrl)
        return res.data;
    } catch (error) { console.log(error); }
}

const getSystemByUrlName = async (urlName: string | undefined) => {
    try {
        const res = await axios.get(`${baseUrl}/urlName/${urlName}`)
        return res.data;
    } catch (error) { console.log(error); }
}

const getSystemsOfAdmin = async () => {
    try {
        const headers = await getHeaders();  
        const res = await axios.get(`${baseUrl}/ofAdmin`, {
            headers: headers,
        })
        return res.data;
    } catch (error) { console.log(error); }
}

const getSystemById = async (systemId: string) => {
    try {
        const headers = await getHeaders();  
        const res = await axios.get(`${baseUrl}/${systemId}`, {
            headers: headers,
        });

        return res.data;
    } catch (error) { console.log(error); }
}

const updateSystem = async (system: System) => {
    const headers = await getHeaders();  
    const res = await axios.put(`${baseUrl}/${system._id}`, system, {
        headers: headers,
    });
    return res.data;
}

const deleteSystem = async (systemId: string) => {
    const headers = await getHeaders();  
    const res = await axios.delete(`${baseUrl}/${systemId}`, {
        headers: headers,
    });
    return res.data;
}

class Store {
    systems: System[] = [];
    currentSystem: System | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async getAllSystems() {
        this.systems = await getAllSystems();
    }

    async getSystemByUrlName(urlName: string | undefined) {
        this.currentSystem = await getSystemByUrlName(urlName);
    }

    async getSystemsOfAdmin() {
        this.systems = await getSystemsOfAdmin();
    }

    async getSystemById(systemId: string) {
        this.currentSystem = await getSystemById(systemId);
    }

    async addSystem(system: System) {
        if (userStore.user) {
            system.adminUid = userStore.user?.fireBaseUId || '';
            await addSystem(system);
            this.systems.push(system);
        }
        else swal("Please Login!",
            "you can't make a system before login!",
            "error");
    }

    async updateSystem(system: System) {
        this.currentSystem = await updateSystem(system);
    }

    async removeSystem(systemId: string) {
        await deleteSystem(systemId);
    }

}
const systemStore = new Store();
export default systemStore;