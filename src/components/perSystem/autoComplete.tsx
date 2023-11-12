import { useRef, useEffect, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { observer } from 'mobx-react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FormControl, TextField, MenuItem } from '@mui/material';
import markerStore from '../../store/MarkerStore';
import '../../style/map.css';

type DirectionsResult = google.maps.DirectionsResult;
interface props {
    helperText: string;
    setOffice: (position: google.maps.LatLngLiteral) => void;
}

export const AutoComplete = ({ helperText, setOffice }: props) => {

    const mapRef = useRef<GoogleMap>();
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();
    const inputRef = useRef<any>();
    const [position, setPosition] = useState<DirectionsResult | any>();

    useEffect(() => {
        if (mapRef.current?.panTo && position)
            mapRef.current?.panTo(markerStore.autoCompleteMarker)

    }, [position]);

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();
        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        markerStore.autoCompleteMarker.lat = lat;
        markerStore.autoCompleteMarker.lng = lng;
        setPosition({ lat, lng });
        setOffice({ lat, lng });
    }

    return (
        <>
            <FormControl fullWidth >
                <TextField
                    ref={inputRef}
                    value={value}
                    helperText={helperText}
                    onChange={(e) => { setValue(e.target.value) }}
                    disabled={!ready} />
                {status === 'OK' && data.map(({ place_id, description }) =>
                    <MenuItem key={place_id} onClick={() => { handleSelect(description) }}
                        value={description} >
                        {description}
                    </MenuItem>
                )}
            </FormControl>
        </>

    )
}
export default observer(AutoComplete)
