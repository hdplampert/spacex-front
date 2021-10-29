import { GlobalContextProvider } from './context/global';
import { PastLaunches } from './pages/launches/PastLaunches';
import { UpcomingLaunches } from './pages/launches/UpcomingLaunches';
import './App.css';

export const App = () => {
  return (
    <div className="App">
      <GlobalContextProvider>
        <UpcomingLaunches></UpcomingLaunches>
        <PastLaunches></PastLaunches>
      </GlobalContextProvider>
    </div>
  );
}
