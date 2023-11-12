import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import {
    Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption
} from '@reach/combobox'
import '../../style/places.css'

type placesProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
}

const Place = ({ setOffice }: placesProps) => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setOffice({ lat, lng });
    }

    return (
        <>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput value={value} onChange={e => {setValue(e.target.value); }} disabled={!ready}
                    placeholder="Search for another starting location" className="combobox-input" />
                <ComboboxPopover >
                    <ComboboxList  >
                        {status === "OK" && data.map(({ place_id, description }) =>
                            (<ComboboxOption key={place_id} value={description} className="c" />)) }
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    )
}
export default Place;