import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { auth } from '../config/firebase';
import { User } from '../utils/User'

const baseUrl = 'http://localhost:3333/user';
// const baseUrl = 'https://rr-waze-final-project.uc.r.appspot.com/user';

const getHeaders = async () => {
    const token = await auth.currentUser?.getIdToken();
    return {
        Authorization: `Bearer ${token}`
    }
}

const addUser = async (firstName: string, lastName: string, phone: string | undefined | null) => {
    try {
        const headers = await getHeaders();
        const user = {
            fireBaseUId: auth.currentUser?.uid,
            role: 'admin',
            firstName,
            lastName,
            phone,
            email: auth.currentUser?.email,
        }
        const res = await axios.post(baseUrl, user, {
            headers: headers,
        });
        let tempList = await res.data;
        return tempList;
    } catch (error) { console.log(error); }
}

const getUser = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
        try {
            const headers = await getHeaders();  
            const res = await axios.get(`${baseUrl}/${userId}`, {
                headers: headers,
            });
            return res.data;
        } catch (error) { console.log(error); }
    }
}

class Store {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async addUser(firstName: string, lastName: string, phone: string | undefined | null) {
        await addUser(firstName, lastName, phone);
        this.getUser();
    }

    async getUser() {
        this.user = await getUser();
    }
}
const userStore = new Store();
export default userStore;