import { useGoogleMap } from '@react-google-maps/api';
import { useEffect } from 'react';

type Props = {
  position: google.maps.LatLngLiteral | null;
};

export const PanningComponent = ({ position }: Props) => {
  const map = useGoogleMap();

  useEffect(() => {
    if (position) {
      map?.panTo(position);
    }
  }, [map, position]);

  return null;
};
