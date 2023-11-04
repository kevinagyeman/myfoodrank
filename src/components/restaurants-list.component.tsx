import { scoreService } from '@/services/restaurant-score.service';
import { Button } from './ui/button';
import { restaurantService } from '@/services/restaurant.service';
import { dishService } from '@/services/dish.service';

export default function RestaurantsList() {
  const stampa = () => {
    scoreService.getRankedRestaurants();
  };
  const stampa2 = () => {
    restaurantService.getAll({
      fieldPath: 'name',
      directionStr: 'asc',
    });
  };
  const stampa3 = () => {
    dishService.getAll({
      fieldPath: 'name',
      directionStr: 'asc',
    });
  };
  const stampa4 = () => {
    scoreService.updateScore('9sjwHcazEwcMQujZG1p2', '+');
    scoreService.getRankedRestaurants();
  };
  const stampa5 = () => {
    scoreService.updateScore('9sjwHcazEwcMQujZG1p2', '-');
    scoreService.getRankedRestaurants();
  };
  const stampa6 = () => {
    scoreService.getByDishAndRestaurant();
  };

  return (
    <>
      <Button onClick={() => stampa()}>
        Stampa i ristoranti in ordine di piatto
      </Button>
      <br />
      <Button onClick={() => stampa2()}>Stampa i ristoranti</Button>
      <br />
      <Button onClick={() => stampa3()}>Stampa i piatti</Button>
      <br />
      <Button onClick={() => stampa4()}>Aumenta lo score</Button>
      <br />
      <Button onClick={() => stampa5()}>Diminuisci lo score</Button>
      <br />
      <Button onClick={() => stampa6()}>trova lo score</Button>
    </>
  );
}
