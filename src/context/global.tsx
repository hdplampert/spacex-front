import React, { createContext, useState } from "react";

type ExpandedSection = "upcoming-launches" | "past-launches" | undefined;

export interface GlobalState {
  expandedSection?: ExpandedSection;
}

interface Props {
  state: GlobalState,
  setState: Function,
}

const DEFAULT_VALUE = {
  state: {
    expandedSection: undefined,
  },
  setState: () => {}
};

export const GlobalContext = createContext<Props>(DEFAULT_VALUE);

export const GlobalContextProvider: React.FunctionComponent = (props) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
