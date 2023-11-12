/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordReset } from '../../models/auth/index';
import { auth } from '../../config/firebase';
import Button from '@mui/material/Button';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import swal from 'sweetalert';

import '../../style/reset.css';
import { Nav } from '../../components/Nav';

const Reset = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) navigate('/');
    }, [])

    const [email, setEmail] = useState("");

    const resetPassword = () => {
        if (email) {
            sendPasswordReset(email);
            navigate('/auth/login');
        }
        else
            swal("Fill Fields!",
                "you have to fill email!",
                "error");
    }

    return (
        <>
            <Nav />
            <div className='reset'>
                <div className='icons_style'>reset password <LockResetOutlinedIcon /></div><br />
                <input
                    type="text"
                    className="textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                /><br />
                <Button color='error'
                    variant="contained"
                    onClick={resetPassword}
                    sx={{ mt: 1, mr: 1 }}
                >
                    Send password reset email
                </Button>
                <div>
                    Already have an account? <Link to="/auth/login">Log In</Link> now.
                </div>
            </div>
        </>
    )
}

export default Reset