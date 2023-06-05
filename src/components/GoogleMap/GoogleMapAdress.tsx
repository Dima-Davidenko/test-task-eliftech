import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { getAddressByCoords } from '../../utils/getAddressByCoords';
import css from './GoogleMap.module.css';
import { PanningComponent } from './PanningComponent/PanningComponent';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { updateSelectedAddress } from '../../redux/clientData/clientDataSlice';

type Props = {
  getDirections: boolean;
  setClientAddressesArray: (addresses: string[]) => void;
  setDirectionProps: (
    directionProps: {
      distance: string | undefined;
      duration: string | undefined;
    } | null
  ) => void;
};

const GoogleMapAdress = ({ setClientAddressesArray, setDirectionProps, getDirections }: Props) => {
  const dispatch = useTypedDispatch();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const center: google.maps.LatLngLiteral = {
    lat: 49.83585078556992,
    lng: 24.031460890210997,
  };

  const shopAddress: google.maps.LatLngLiteral = {
    lat: 49.8382814632069,
    lng: 23.972132756869566,
  };
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const handleMarkerDrug = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarkerPosition(position);
      dispatch(updateSelectedAddress(''));
    }
  };
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    getAddressByCoords(markerPosition).then(res => {
      if (res) {
        const formattedAddresses = res.results.map((item: any) => {
          return item.formatted_address;
        }) as string[];
        setClientAddressesArray(formattedAddresses.slice(0, 5));
      }
    });
  }, [markerPosition, setClientAddressesArray]);
  useEffect(() => {
    if (!getDirections) {
      setDirections(null);
    }
  }, [getDirections]);

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    console.log('response Directions Service: ', result);

    if (result !== null) {
      if (status === 'OK') {
        console.log('setDirections');
        setDirections(result);
        setDirectionProps({
          distance: result.routes[0].legs[0].distance?.text,
          duration: result.routes[0].legs[0].duration?.text,
        });
      } else {
        console.log('error Directions Service: ', result);
      }
    }
  };

  return (
    <div className={css.container}>
      {!isLoaded && <p>Map isn't loaded</p>}
      {isLoaded && (
        <GoogleMap
          center={markerPosition || center}
          zoom={13}
          mapContainerClassName={css.mapContainer}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          {markerPosition && !directions && getDirections && (
            <DirectionsService
              options={{
                destination: shopAddress,
                origin: markerPosition,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
              onLoad={directionsService => {
                console.log('DirectionsService onLoad directionsService: ', directionsService);
              }}
              onUnmount={directionsService => {
                console.log('DirectionsService onUnmount directionsService: ', directionsService);
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
              }}
              onLoad={directionsRenderer => {
                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer);
              }}
              onUnmount={directionsRenderer => {
                console.log(
                  'DirectionsRenderer onUnmount directionsRenderer: ',
                  directionsRenderer
                );
              }}
            />
          )}
          <PanningComponent position={markerPosition} />
          <MarkerF
            position={markerPosition || center}
            draggable
            onDragEnd={handleMarkerDrug}
            label="Your address"
          />
          <MarkerF position={shopAddress} label="Mc Donny" />
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapAdress;
