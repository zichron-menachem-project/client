import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import systemStore from '../store/SystemStore';
import swal from 'sweetalert';
import { System } from '../utils/System';
import userStore from '../store/UserStore';

interface props {
    systemUid: string;
    setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditSystem = ({ systemUid, setOpenEdit }: props) => {
    const [system, setSystem] = useState<System | null>(null);

    const inputTopic = useRef<HTMLInputElement>();
    const inputUrlName = useRef<HTMLInputElement>();
    const inputUrlImg = useRef<HTMLInputElement>();
    const inputObjectName = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();

    const navigate = useNavigate();
    useEffect(() => {
        if (!userStore.user) {
            navigate('/');
        }
        const fetch = async () => {
            await systemStore.getSystemById(systemUid);
            setSystem(systemStore.currentSystem);
        };
        fetch();
    }, [navigate, systemUid]);

    const allFieldsAreFilled = () => {
        if (!inputTopic.current?.value || !inputUrlName.current?.value || !inputUrlImg.current?.value ||
            !inputObjectName.current?.value || !inputDescription.current?.value) {
            swal("Fill Fields!",
                "All the fields that marked with * is required!",
                "error");
            return false;
        }
        if (!inputEmail.current?.value && !inputPhone.current?.value) {
            swal("Fill Fields!",
                "we are must your communication details give as your email or phone!",
                "error");
            return false;
        }
        return true;
    }

    const editSystem = async () => {
        if (allFieldsAreFilled()) {
            const systemToSave = {
                _id: systemUid,
                topic: inputTopic.current?.value || '',
                urlName: inputUrlName.current?.value || '',
                urlImg: inputUrlImg.current?.value || '',
                objectName: inputObjectName.current?.value || '',
                adminUid: system?.adminUid || '',
                description: inputDescription.current?.value || '',
                communicationDetails: {
                    email: inputEmail.current?.value || '',
                    phone: inputPhone.current?.value || '',
                }
            }
            await systemStore.updateSystem(systemToSave);
            close();
            await swal({
                title: "Saved!",
                text: "your details update",
                icon: "success",
                button: "ok!",
            } as any);
        }
    };

    const close = () => setOpenEdit(false);

    return (
        <Dialog
            open={system != null}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Add your system details to update"}
            </DialogTitle>
            <DialogContent >
                <DialogContentText id="alert-dialog-description" />
                <TextField id="filled-password-input"
                    inputRef={inputTopic}
                    defaultValue={system?.topic}
                    label='topic'
                    variant="filled"
                    sx={{ margin: '3%' }}
                    required={true}
                /> <br />
                <TextField id="outlined-basic"
                    inputRef={inputUrlName}
                    defaultValue={system?.urlName}
                    label='urlName'
                    variant="filled"
                    sx={{ margin: '3%' }}
                    required={true}
                /><br />
                <TextField id="outlined-basic"
                    inputRef={inputUrlImg}
                    defaultValue={system?.urlImg}
                    label='urlImg'
                    variant="filled"
                    sx={{ margin: '3%' }}
                    required={true}
                /><br />
                <TextField id="outlined-basic"
                    inputRef={inputObjectName}
                    defaultValue={system?.objectName}
                    label='objectName'
                    variant="filled"
                    sx={{ margin: '3%' }}
                    required={true}
                /><br />
                <TextField id="outlined-basic"
                    inputRef={inputDescription}
                    defaultValue={system?.description}
                    label='description'
                    multiline
                    rows={2}
                    variant="filled"
                    sx={{ margin: '3%' }}
                    required={true}
                /><br />
                <TextField id="outlined-basic"
                    inputRef={inputEmail}
                    defaultValue={system?.communicationDetails?.email}
                    label='email'
                    variant="filled"
                    sx={{ margin: '3%' }}
                /><br />
                <TextField id="outlined-basic"
                    inputRef={inputPhone}
                    defaultValue={system?.communicationDetails?.phone}
                    label='phone'
                    variant="filled"
                    sx={{ margin: '3%' }}
                />
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={close}> Cancel </Button>
                <Button color='error' onClick={editSystem} autoFocus> Save </Button>
            </DialogActions>
        </Dialog>
    )
}