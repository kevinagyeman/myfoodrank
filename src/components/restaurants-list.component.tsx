import { restaurantsScoreListState } from '@/store/restaurants-score-store';
import { useRecoilValue } from 'recoil';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function RestaurantsList() {
  const rankedRestaurantsList = useRecoilValue(restaurantsScoreListState);
  return (
    <>
      <div className='container max-w-3xl flex flex-col gap-y-5 py-10'>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Dish</TableHead>
              <TableHead className='text-right'>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankedRestaurantsList.map(
              (restaurantScore: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>
                    {restaurantScore.restaurant.name}
                  </TableCell>
                  <TableCell className='font-medium'>
                    {restaurantScore.dish.name}
                  </TableCell>
                  <TableCell className='text-right'>
                    {restaurantScore.score}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
