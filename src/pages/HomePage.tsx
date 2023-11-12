/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import IPageProps from '../interfaces/page.interface';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) {
            navigate('/managerPage');
        }
        else {
            navigate('/auth/login');
        }
    }, []);


    return (
        <div>
            Home Page!
        </div>
    );
}

export default HomePage;