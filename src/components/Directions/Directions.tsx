import { useSelector } from 'react-redux';
import css from './Directions.module.css';
import { selectSelectedShopCoords } from '../../redux/selectedShopData/selectedShopDataSelectors';
import { selectSelectedMarkerPosition } from '../../redux/clientData/clientDataSelectors';

type Props = {
  directions: boolean;
  setDirections: (directions: boolean) => void;
  directionProps: {
    distance: string | undefined;
    duration: string | undefined;
  } | null;
  setDirectionProps: (
    props: {
      distance: string | undefined;
      duration: string | undefined;
    } | null
  ) => void;
};

const Directions = ({ directionProps, directions, setDirections, setDirectionProps }: Props) => {
  const selectedShopAddress = useSelector(selectSelectedShopCoords);
  const selectedMarkerPosition = useSelector(selectSelectedMarkerPosition);
  const resetDirections = () => {
    setDirections(false);
    setDirectionProps(null);
  };
  if (!selectedShopAddress || !selectedMarkerPosition) {
    return <div>Select shop and set "Your address" Marker to get directions</div>;
  }
  return (
    <div className={css.container}>
      {directions ? (
        <button className={css.btn} onClick={resetDirections}>
          Reset directions
        </button>
      ) : (
        <button className={css.btn} onClick={() => setDirections(true)}>
          Get directions
        </button>
      )}
      {directionProps && (
        <>
          <p>Distance: {directionProps.distance}</p>
          <p>Duration: {directionProps.duration}</p>
        </>
      )}
    </div>
  );
};

export default Directions;
