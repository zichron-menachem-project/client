/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemAvatar, Typography } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Fragment, useEffect, useState } from 'react';
import markerStore from '../../store/MarkerStore';
import { toJS } from 'mobx';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

type LatLngLiteral = google.maps.LatLngLiteral;

interface LatLngDuration {
    latLng: LatLngLiteral,
    duration: { value: number, text: string },
}

interface props {
    setOpenNear: React.Dispatch<React.SetStateAction<boolean>>,
    office: LatLngLiteral | undefined,
}

export const NearPlaces: React.FC<props> = ({ setOpenNear, office }: props) => {

    let [add0, setAdd0] = useState<string>('aaa');
    let [add1, setAdd1] = useState<string>('aaa');
    let [add2, setAdd2] = useState<string>('aaa');
    let [km0, setKm0] = useState<string>('5 km');
    let [km1, setKm1] = useState<string>('5 km');
    let [km2, setKm2] = useState<string>('5 km');
    const houses: LatLngLiteral[] = [];
    const nearbyLocations: LatLngDuration[] = [];
    const [show, setShow] = useState<boolean>(false);

    toJS(markerStore.markers).map(m => houses.push({ lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng }));
    useEffect(() => {
        const serverCalls = async () => {
            await fetchDistanceMatrixService();

            const func = async () => {
                const ad0 = await geocodePlaceId(nearbyLocations[0].latLng);
                if (ad0) { setAdd0(ad0.formatted_address); setKm0(nearbyLocations[0].duration.text)}
                const ad1 = await geocodePlaceId(nearbyLocations[1].latLng);
                if (ad1) { setAdd1(ad1.formatted_address); setKm1(nearbyLocations[1].duration.text)}
                const ad2 = await geocodePlaceId(nearbyLocations[2].latLng);
                if (ad2) { setAdd2(ad2.formatted_address); setKm2(nearbyLocations[2].duration.text)}
            }

            await func();
            console.log(km0)
            setShow(true);
            console.log(nearbyLocations[0].duration.text)
        }

        serverCalls();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDistanceMatrixService = async () => {
        if (!office || houses.length <= 3) return;
        const service = new google.maps.DistanceMatrixService();
        await service.getDistanceMatrix({
            origins: [office],
            destinations: [...houses],
            travelMode: google.maps.TravelMode.DRIVING
        }, (response, status) => {
            if (status === 'OK' && response) {
                NearbyLocations(response.rows[0].elements);
            }
        });
    }

    const NearbyLocations = (elements: google.maps.DistanceMatrixResponseElement[]) => {
        nearbyLocations.length = 0;
        const nearLocation: LatLngDuration = { latLng: houses[0], duration: { text: '', value: Number.MAX_VALUE } };
        nearbyLocations.push(nearLocation);
        nearbyLocations.push(nearLocation);
        nearbyLocations.push(nearLocation);

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].distance.value < nearbyLocations[0].duration.value) {
                nearbyLocations[2] = nearbyLocations[1];
                nearbyLocations[1] = nearbyLocations[0];
                nearbyLocations[0] = { latLng: houses[i], duration: elements[i].distance };
            }
            else if (elements[i].distance.value < nearbyLocations[1].duration.value) {
                nearbyLocations[2] = nearbyLocations[1];
                nearbyLocations[1] = { latLng: houses[i], duration: elements[i].distance };
            }
            else if (elements[i].distance.value < nearbyLocations[2].duration.value) {
                nearbyLocations[2] = { latLng: houses[i], duration: elements[i].distance };
            }
        };
    }

    const close = () => {
        setOpenNear(false);
    }

    const geocodePlaceId = async (
        latlng: LatLngLiteral,
    ) => {
        const geocoder = new google.maps.Geocoder();
        try {
            const response: google.maps.GeocoderResponse = await geocoder.geocode({ location: latlng });
            if (response.results.length > 0) {
                return response.results[0];
            }
        } catch (e) { window.alert('Geocoder failed due to: ' + e) };
    }

    return (
        <Dialog
            open={show}
            onClose={close}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {'3 near Locations'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description' />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems='flex-start' />
                    <ListItemAvatar>
                        <Avatar src='https://img.freepik.com/premium-vector/red-pin-point-location-symbol-isolated-white-background_120819-396.jpg' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={add0}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                />
                                    km: {km0}
                            </Fragment>
                        }
                    />
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start' />
                    <ListItemAvatar>
                        <Avatar src='https://img.freepik.com/premium-vector/red-pin-point-location-symbol-isolated-white-background_120819-396.jpg' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={add1}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                />
                                    km: {km1}
                            </Fragment>
                        }
                    />
                    <Divider variant='inset' component='li' />
                    <ListItem alignItems='flex-start' />
                    <ListItemAvatar>
                        <Avatar src='https://img.freepik.com/premium-vector/red-pin-point-location-symbol-isolated-white-background_120819-396.jpg' />
                    </ListItemAvatar>
                    <ListItemText
                        primary={add2}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component='span'
                                    variant='body2'
                                    color='text.primary'
                                />
                                    km: {km2}
                            </Fragment>
                        }
                    />
                </List>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={close}><ModeOfTravelIcon /></Button>
            </DialogActions>
        </Dialog>
    )
}

export default NearPlaces