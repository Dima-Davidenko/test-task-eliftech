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
import {
  updateSelectedAddress,
  updateSelectedMarkerPosition,
} from '../../redux/clientData/clientDataSlice';
import { useSelector } from 'react-redux';
import {
  selectSelectedShopCoords,
  selectSelectedShopName,
} from '../../redux/selectedShopData/selectedShopDataSelectors';
import { selectSelectedMarkerPosition } from '../../redux/clientData/clientDataSelectors';

type Props = {
  getDirections: boolean;
  setClientAddressesArray: (addresses: google.maps.GeocoderResult[] | null) => void;
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
  const selectedShopAddress = useSelector(selectSelectedShopCoords);
  const selectedShopName = useSelector(selectSelectedShopName);

  const defaultMapCenter: google.maps.LatLngLiteral = {
    lat: 49.844028239230354,
    lng: 24.0263659852304,
  };

  const selectedMarkerPosition = useSelector(selectSelectedMarkerPosition);

  const handleMarkerDrug = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      dispatch(updateSelectedMarkerPosition(position));
      dispatch(updateSelectedAddress(''));
    }
  };
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    getAddressByCoords(selectedMarkerPosition).then(res => {
      if (res) {
        const resultsArray = res.slice(0, 5);
        setClientAddressesArray(resultsArray);
      }
    });
  }, [selectedMarkerPosition, setClientAddressesArray]);

  useEffect(() => {
    if (!getDirections) {
      setDirections(null);
    }
  }, [getDirections]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch(updateSelectedMarkerPosition(pos));
      });
    }
  }, [dispatch]);

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (result !== null) {
      if (status === 'OK') {
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
          center={selectedMarkerPosition || defaultMapCenter}
          zoom={13}
          mapContainerClassName={css.mapContainer}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          {selectedMarkerPosition && selectedShopAddress && !directions && getDirections && (
            <DirectionsService
              options={{
                destination: selectedShopAddress,
                origin: selectedMarkerPosition,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
              }}
            />
          )}
          <PanningComponent position={selectedMarkerPosition} />
          <MarkerF
            position={selectedMarkerPosition || defaultMapCenter}
            draggable
            onDragEnd={handleMarkerDrug}
            label="Your address"
          />
          {selectedShopAddress && (
            <MarkerF position={selectedShopAddress} label={selectedShopName} />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapAdress;
