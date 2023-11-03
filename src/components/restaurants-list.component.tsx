import { service } from '@/services/service';
import { Button } from './ui/button';

export default function RestaurantsList() {
  const stampa = () => {
    service.getRankedRestaurants();
  };

  return (
    <>
      <Button onClick={() => stampa()}>Stampa i ristoranti</Button>
    </>
  );
}
