/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { logInWithEmailAndPassword, signInWithGoogle } from '../../models/auth/index';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../config/firebase';

import Button from '@mui/material/Button';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import GoogleIcon from '@mui/icons-material/Google';
import swal from 'sweetalert';

import '../../style/login.css';
import { Nav } from '../../components/Nav';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) navigate('/');
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        if (email && password) {
            logInWithEmailAndPassword(email, password);
            navigate('/');
        }
        else
            swal("Fill Fields!",
                "you have to fill email & password!",
                "error");
    }

    const loginWithGoogle = async () => {
        await signInWithGoogle();
        navigate('/');
    }

    return (
        <>
            <Nav />
            <div className='login'>
                <div className='icons_style'>log in <AccountCircleRoundedIcon /></div><br />
                <div>
                    <input
                        type="text"
                        className="textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    /><br />
                    <input
                        type="password"
                        className="textBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div>
                    Forget your password? <Link to="/auth/reset">Reset</Link> now.
                </div>
                <Button color='error'
                    variant="contained"
                    onClick={login}
                    sx={{ mt: 1, mr: 1 }}
                >
                    Login
                </Button><br />
                <Button color='error'
                    variant="contained"
                    onClick={loginWithGoogle}
                    sx={{ mt: 1, mr: 1 }}
                >
                    login with Google
                    <GoogleIcon className='google-icon' />
                </Button>
                <div>
                    Don't have an account? <Link to="/auth/signup">Sign Up</Link> now.
                </div>

            </div>
        </>
    )
}

export default Login