import IRoute from '../interfaces/route.interface';
import SignUpPage from '../pages/auth/SignUpPage';
import Login from '../pages/auth/Login';
import Reset from '../pages/auth/Reset';
import HomePage from '../pages/HomePage';
import ManagerPage from '../pages/ManagerPage';
import ErrorPage from '../pages/ErrorPage';
import { SystemHome } from '../pages/systemHome';
import { AddMarker } from '../components/markers/addMarker';

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        index: 1,
        name: 'Home Page',
        protected: false
    }, {
        path: '/auth',
        exact: true,
        component: SignUpPage,
        index: 2,
        name: 'Sign Up Page',
        protected: false
    }, {
        path: '/auth/signup',
        exact: true,
        component: SignUpPage,
        index: 2,
        name: 'Sign Up Page',
        protected: false
    }, {
        path: '/auth/login',
        exact: true,
        component: Login,
        index: 3,
        name: 'Login Page',
        protected: false
    }, {
        path: '/auth/reset',
        exact: true,
        component: Reset,
        index: 4,
        name: 'Reset Page',
        protected: false
    }, {
        path: '/managerPage',
        exact: true,
        component: ManagerPage,
        index: 5,
        name: 'Manager Page',
        protected: false
    }, {
        path: '/errorPage',
        exact: true,
        component: ErrorPage,
        index: 6,
        name: 'Error Page',
        protected: false
    }, {
        path: '/:systemUrl',
        exact: true,
        component: SystemHome,
        index: 8,
        name: 'System Page',
        protected: false,
        children: [{
            path: '/:systemUrl/addMarker',
            exact: true,
            component: AddMarker,
            index: 7,
            name: 'Add Marker',
            protected: false
        }]
    },

];
export default routes;