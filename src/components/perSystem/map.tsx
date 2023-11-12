import { useMemo, useState, useCallback, useRef, useEffect, Fragment } from 'react';
import { Box, Button } from '@mui/material';
import { AddMarker } from '../markers/addMarker';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import { Circle, DirectionsRenderer, GoogleMap, Marker, MarkerClusterer, MarkerClustererProps } from '@react-google-maps/api';
import AutoComplete from './autoComplete';
import markerStore from '../../store/MarkerStore';
import { toJS } from 'mobx';
import { auth } from '../../config/firebase';
import swal from 'sweetalert';
import NearPlaces from '../markers/nearPlaces';

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export const Map = () => {
  const [directions, setDirections] = useState<DirectionsResult | any>();
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const options = useMemo<MapOptions>(() => ({ disableDefaultUI: true, clickableIcons: false, }), []);
  const [isHoveringAdd, setIsHoveringAdd] = useState(false);
  const [isHovering3Place, setIsHovering3Place] = useState(false);
  const [openAddMarker, setOpenAddMarker] = useState(false);
  const [openNearLocation, setOpenNearLocation] = useState(false);
  const onLoad = useCallback((map: any) => (mapRef.current = map), [])
  const houses: LatLngLiteral[] = [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setOffice({ lat: position.coords.latitude, lng: position.coords.longitude });
    })
  }, []);

  // useEffect(() => {
  //   mapRef.current?.render();
  // }, [nearLocation, office]);

  toJS(markerStore.markers).map(m => houses.push({ lat: m.locationGeolocation.lat, lng: m.locationGeolocation.lng }));

  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;
    const service = new google.maps.DirectionsService();
    setDirections(office);
    service.route(
      {
        origin: office,
        destination: house,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK' && response) {
          setDirections(response);
        }
      }
    );
  }

  return (
    <div className='container'>
      <Box sx={{ width: '20%', direction: 'rtl' }}>
        <AutoComplete helperText='Search for another starting location' setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position)
        }} />
      </Box>

      <Box onMouseOver={() => setIsHoveringAdd(true)} onMouseOut={() => setIsHoveringAdd(false)}
        sx={{ zIndex: '1', position: 'absolute', bottom: '100px', right: '60px', display: 'flex', marginBottom: '0%' }}>
        <Button color='error' variant="outlined" onClick={() => {
          if (!auth.currentUser)
            swal("You cannot add a new marker", "You need to identify yourself");
          else
            setOpenAddMarker(true);
        }}
          sx={{ marginTop: '30px', marginLeft: '70px' }}>
          <AddLocationAltIcon />
          {isHoveringAdd && 'add marker'}
        </Button>
      </Box>
      {openAddMarker && <AddMarker setOpenAdd={setOpenAddMarker} />}

      <Box onMouseOver={() => setIsHovering3Place(true)} onMouseOut={() => setIsHovering3Place(false)}
        sx={{ zIndex: '1', position: 'absolute', bottom: '50px', right: '60px', display: 'flex', marginBottom: '0%' }}>
        <Button color='error' variant="outlined" onClick={ async() => {
          if (houses.length <= 3){
            swal("Oooops...", "You have no more then 3 places");
          }
          else
            setOpenNearLocation(true);
        }}
          sx={{ marginTop: '30px', marginLeft: '70px' }}>
            <ShareLocationIcon sx={{ marginLeft: '3px' }} />
          {isHovering3Place && 'nearby places'}

        </Button>
      </Box><>
      {openNearLocation && <NearPlaces setOpenNear={setOpenNearLocation} office={office} />}
</>
      <div className='map' >
        <GoogleMap
          zoom={10}
          center={office}
          mapContainerClassName='map-container'
          options={options}
          onLoad={onLoad}
        >
          {directions && <DirectionsRenderer directions={directions} options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2",
              strokeWeight: 5
            }
          }} />}
          {office && (
            <>
              <Marker
                position={office}
                icon={{ url: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png", scaledSize: new google.maps.Size(73, 70) }}
              />
              <MarkerClusterer>
                {(clusterer: any | MarkerClustererProps | Readonly<MarkerClustererProps>): any =>
                  houses.map((house: LatLngLiteral, index: number) => (
                    <Marker
                      key={index}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  )) 
                }
              </MarkerClusterer>
              <Circle center={office} radius={1500}
                options={{ fillColor: 'green', fillOpacity: 0.1, strokeColor: 'green' }} />
              <Circle center={office} radius={7000}
                options={{ fillColor: 'orange', fillOpacity: 0.1, strokeColor: 'orange' }} />
              <Circle center={office} radius={15000}
                options={{ fillColor: 'red', fillOpacity: 0.1, strokeColor: 'red' }} />
            </>
          )}
        </GoogleMap>
      </div>
      
    </div>

  )

};
