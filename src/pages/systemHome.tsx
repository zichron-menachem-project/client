/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { SystemHeader } from '../components/perSystem/systemHeader';
import { Map } from '../components/perSystem/map';
import { Box } from '@mui/material';
import systemStore from '../store/SystemStore';
import markerStore from '../store/MarkerStore';

export const SystemHome = () => {
  const [getSystem, setGetSystem] = useState<boolean>(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  })

  const { systemUrl } = useParams();

  useEffect(() => {
    const serverCalls = async () => {
      await systemStore.getSystemByUrlName(systemUrl);
      await markerStore.getMarkersBySystemId();
      setGetSystem(true);
    }

    serverCalls();
  }, [])


  if (!isLoaded) {
    return <div className='loader-container'>LOADING MAPS
      <span className='loadingAnim1'>.</span>
      <span className='loadingAnim2'>.</span>
      <span className='loadingAnim3'>.</span>
    </div>
  };


  return (
    <>
      <Nav />
      {getSystem &&
        <>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <SystemHeader />
          </Box>

          <Box sx={{ width: '100%', direction: 'rtl' }} >
            <Map />
          </Box>
        </>
      }
    </>
  )
}

