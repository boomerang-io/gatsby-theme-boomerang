/* https://javascript.plainenglish.io/google-analytics-with-react-router-and-hooks-16d403ddc528 */

import { useEffect } from "react";

export default function useTracking(location) {
  useEffect(() => {
    if (global.ibmStats) {
      return ibmStats.pageview();
    }
  }, [location]);
}