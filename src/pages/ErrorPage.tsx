import React from "react";
import { AxiosError } from 'axios';

interface props {
    error: AxiosError;
}

const ErrorPage: React.FC<props> = ({ error }: props) => {

    return (
        <div>We Are Soooooooooooooo Sorry but...
           <p>{error.message}</p> 
        </div>
    )
}

export default ErrorPage