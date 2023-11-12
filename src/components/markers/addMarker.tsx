import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import markerStore from '../../store/MarkerStore';
import swal from 'sweetalert';
import AutoComplete from '../perSystem/autoComplete';
import { GoogleMap } from '@react-google-maps/api';
import { Marker } from '../../utils/Marker';

type LatLngLiteral = google.maps.LatLngLiteral;

interface props {
    setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddMarker: React.FC<props> = ({ setOpenAdd }: props) => {

    const inputDescription = useRef<HTMLInputElement>();
    const inputName = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputPhone = useRef<HTMLInputElement>();
    const [office, setOffice] = useState<LatLngLiteral>();
    const mapRef = useRef<GoogleMap>();

    const allFieldsAreFilled = () => {
        if (!office || !inputDescription.current?.value || !inputName.current?.value ||
            !inputNotes.current?.value) {
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

    const handleCloseAndSave = async () => {
        if (allFieldsAreFilled()) {
            const markerToSave: Marker = {
                system_id: '',
                manager_id: '',
                locationGeolocation: {
                    lat: office?.lat || 0,
                    lng: office?.lng || 0
                },
                description: inputDescription.current?.value || '',
                name: inputName.current?.value || '',
                notes: inputNotes.current?.value || '',
                communicationDetails: {
                    email: inputEmail.current?.value || '',
                    phone: inputPhone.current?.value || '',
                }
            }

            try {
                await markerStore.addMarker(markerToSave);
                close();
                swal({
                    title: 'Saved!',
                    text: 'your marker added ',
                    icon: 'success',
                    button: 'ok!',
                } as any);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const close = () => {
        setOpenAdd(false);
    }

    return (
        <Dialog
            open={true}
            onClose={close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {'Add your system details'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description' />
                <TextField id='outlined-basic'
                    inputRef={inputDescription}
                    label='Description'
                    variant='outlined'
                    required
                    sx={{ margin: '3%' }} />
                <AutoComplete helperText='Place*'
                    setOffice={(position) => {
                        setOffice(position);
                        mapRef.current?.panTo(position)
                    }} />
                <TextField id='outlined-basic'
                    inputRef={inputName}
                    label='Name'
                    variant='outlined'
                    required
                    sx={{ margin: '3%' }} />
                <TextField id='outlined-basic'
                    inputRef={inputNotes}
                    label='Notes'
                    variant='outlined'
                    required
                    sx={{ margin: '3%' }} />
                <TextField id='outlined-basic'
                    inputRef={inputEmail}
                    label='Email system'
                    variant='outlined'
                    sx={{ margin: '3%' }} />
                <TextField id='outlined-basic'
                    inputRef={inputPhone}
                    label='Phone system'
                    variant='outlined'
                    sx={{ margin: '3%' }} />
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={close}>Cancel</Button>
                <Button color='error' onClick={handleCloseAndSave} autoFocus>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default observer(AddMarker);