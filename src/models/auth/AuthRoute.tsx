import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
interface IAuthRouteProps {
    children: ReactNode;
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    if (!auth.currentUser) {
        return <Navigate to="/auth/signup" />;
    }
    return (
        <div>{children}</div>
    );
}

export default AuthRoute;