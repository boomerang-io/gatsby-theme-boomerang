import React from "react";
import { useContext } from "react";


const AppContext = React.createContext(null);

export function AppContextProvider({
  user,
  navigation,
  children,
  gaEnabled,
  trackEvent
}) {
  return (
    <AppContext.Provider
      value={{
        user: user,
        navigation: navigation,
        gaEnabled: gaEnabled,
        trackEvent: trackEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
