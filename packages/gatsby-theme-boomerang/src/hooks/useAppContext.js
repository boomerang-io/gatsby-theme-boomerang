import React from "react";
import { useContext } from "react";


const AppContext = React.createContext({isSideNavMounted: false, setIsSideNavMounted: false, platformName: "", user: {}, navigation: { features: {}, platform: {} } , trackEvent: () => {}});

function useAppContext() {
  return useContext(AppContext);
}

export default useAppContext;
