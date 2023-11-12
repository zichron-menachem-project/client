/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Nav } from '../../components/Nav';
import { auth } from '../../config/firebase';

const register = () => {

    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useNavigate();

    const singUpWithEmailAndPassword = async () => {
        if (password !== confirm) setError('please make shore your password match.');

        if (error !== '') setError('');

        setRegistering(true);

        try {
            const resulte = await auth.createUserWithEmailAndPassword(email, password);

        } catch (error) { }
    }

    return (
        <>
            <Nav />
            <div>register</div>
        </>
    )
}

export default register;