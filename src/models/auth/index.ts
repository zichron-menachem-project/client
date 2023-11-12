import firebase from 'firebase/compat';
import { auth } from '../../config/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import userStore from '../../store/UserStore';
import swal from 'sweetalert';
const googleProvider = new GoogleAuthProvider();


export const SignInWithSocialMedia = async (provider: firebase.auth.AuthProvider) => {
    try {
        const res = await auth.signInWithPopup(provider);
        if (res.user?.displayName) {
            const firstName = res.user?.displayName?.split(' ')[0];
            const lastName = res.user?.displayName?.split(' ')[1];
            userStore.addUser(firstName, lastName, res.user?.phoneNumber);
        }
    } catch (err) { return err }
}

export const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
        createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        userStore.getUser();
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        userStore.getUser();
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        await swal({
            title: "Send!",
            text: "Password reset link sent!",
            icon: "success",
            button: "ok!",
        } as any);
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};