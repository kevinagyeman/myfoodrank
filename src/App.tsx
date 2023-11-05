import { Route, Routes } from 'react-router-dom';
import Index from './pages';
import UpdateScore from './components/restaurant-update-score';

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Index />} />
        <Route path='/update-score' element={<UpdateScore />} />
      </Routes>
    </>
  );
}
