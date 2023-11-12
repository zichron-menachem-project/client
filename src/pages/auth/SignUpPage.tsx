/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat';

import IPageProps from '../../interfaces/page.interface';
import { SignInWithSocialMedia, registerWithEmailAndPassword } from '../../models/auth/index';
import { Providers } from '../../config/firebase';
import userStore from '../../store/UserStore';
import { auth } from '../../config/firebase';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import swal from 'sweetalert';
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded';
import GoogleIcon from '@mui/icons-material/Google';

import '../../style/signup.css';
import { Nav } from '../../components/Nav';

const SignUpPage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) navigate('/');
    }, []);

    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [activeStep, setActiveStep] = useState<number>(0);
    const history = useNavigate();

    const register = () => {
        if (email && password) {
            registerWithEmailAndPassword(email, password);
            return true;
        }
        swal("Fill Fields!",
            "you have to fill email & password!",
            "error");
        return false;
    }

    const signInWithSocialMedia = async (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        try {
            await SignInWithSocialMedia(provider);
            history('/');
        } catch (error: any) {
            setError(error.message);
        }
    }

    const handleNext = () => {
        if (register())
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const saveUser = async () => {
        if (firstName && lastName) {
            await userStore.addUser(firstName, lastName, phone);
            navigate('/');
        }
        else {
            swal("Fill Fields!",
                "you have to fill all your details!",
                "error");
        }
    }

    return (
        <>
            <Nav />
            <div className='signUp'>
                <div className='icons_style'>sign up <LockPersonRoundedIcon /></div>
                <Box sx={{ maxWidth: 400 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step>
                            <StepLabel color='error'>
                                Sign In with Email and Password
                            </StepLabel>
                            <StepContent>
                                <Typography>
                                    <input
                                        type="text"
                                        className="textBox"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="password"
                                        className="textBox"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button color='error'
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                Set Details
                            </StepLabel>
                            <StepContent>
                                <Typography>
                                    <input
                                        type="text"
                                        className="textBox"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        className="textBox"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                    /><input
                                        type="text"
                                        className="textBox"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="phone"
                                    />
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button color='error'
                                            variant="contained"
                                            onClick={saveUser}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Register
                                        </Button>
                                        <Button color='error'
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    </Stepper>
                </Box>
                <Button color='error'
                    variant="contained"
                    onClick={() => signInWithSocialMedia(Providers.google)}
                    sx={{ mt: 1, mr: 1 }}
                >
                    Register with Google
                    <GoogleIcon className='google-icon' />
                </Button>
                <div>
                    Already have an account? <Link to="/auth/login">Log In</Link> now.
                </div>
            </div>
        </>
    );


}

export default SignUpPage;
