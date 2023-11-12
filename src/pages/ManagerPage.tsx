import React from "react";
import ShowAllSystems from '../components/ShowAllSystems';
import { Nav } from '../components/Nav';

const ManagerPage: React.FC = () => {
    return (
        <>
            <Nav />
            <ShowAllSystems />
        </>
    )
}
export default ManagerPage;