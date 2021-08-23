/* https://javascript.plainenglish.io/google-analytics-with-react-router-and-hooks-16d403ddc528 */

import { useEffect } from "react";

export default function useTracking(location) {
  console.log("use tracking");
  useEffect(() => {
    if (global.ibmStats) {
      console.log("trigger page view");
      return ibmStats.pageview();
    }
  }, [location]);
}
