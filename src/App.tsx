import { GlobalContextProvider } from './context/global';
import { PastLaunches } from './pages/launches/PastLaunches';
import { UpcomingLaunches } from './pages/launches/UpcomingLaunches';
import './App.css';
import React from 'react';

interface Props {
}

interface State {
  useVariant?: boolean;
}

export class App extends React.Component<Props, State> {

  intervalId?: any;
  experimentId = "3KyAdYf3T6uvqm3RuHGskw";

  constructor(props: Props) {
    super(props);
    this.state = {
      useVariant: undefined
    }
  }

  async componentDidMount() {
    const Window = window as any;
    if (Window.dataLayer) {
      await Window.dataLayer.push({ event: "optimize.activate" });
    }
    this.intervalId = setInterval(() => {
      if (Window.google_optimize !== undefined) {
        const variant = Window.google_optimize.get(this.experimentId);
        this.setState({ useVariant: variant == 1 });
        clearInterval(this.intervalId);
      }
    }, 100);
  }

  render() {
    const { useVariant } = this.state;
    return (
      <div className={`App ${ useVariant ? "variant" : ""}`}>
        <GlobalContextProvider>
          <UpcomingLaunches></UpcomingLaunches>
          <PastLaunches></PastLaunches>
        </GlobalContextProvider>
      </div>
    );
  }
}
