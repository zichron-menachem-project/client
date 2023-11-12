import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

export const SendGrid = () => {

    const sendEmail = async () => {
        const apiKey = process.env.REACT_APP_SENDGRID_API_KEY;
        // const apiKey = process.env.SENDGRID_API_KEY;
        try {
            await axios.post('https://api.sendgrid.com/v3/mail/send', {
                'personalizations': [{
                    'to': [{
                        'email': 'r9743740@gmail.com',
                        'name': 'Ruty Cohen'
                    }],
                    'subject': 'I looking for you!!!',
                }],
                'content': [{
                    'type': 'text/plain',
                    'value': 'Heya!'
                }],
                'from': {
                    'email': 'r9743740@gmail.com',
                    'name': 'Ruchami Berenstain'
                },
                'reply_to': {
                    'email': 'r9743740@gmail.com',
                    'name': 'Ruchami Berenstain'
                }
            }, {
                // 'Content-Type': 'application/json',
                headers: {'Authorization': `Bearer ${apiKey}`},
            })
        } catch (err) { console.log(err); }

    }

    return (
        <div>
            <Button color='error'
                onClick={sendEmail}
            >send email</Button>
        </div>
    )
}

