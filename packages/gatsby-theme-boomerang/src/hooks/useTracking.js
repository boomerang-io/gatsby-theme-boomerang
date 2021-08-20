/* https://javascript.plainenglish.io/google-analytics-with-react-router-and-hooks-16d403ddc528 */
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useTracking() {
  const { listen } = useHistory();

  useEffect(() => {
    const unlisten = listen((location) => {
      if (!global.ibmStats) {
        return;
      }
      /**
       * check if google makes any calls without calling a pageview
       */
      ibmStats.pageview();
      //   window.gtag('config', trackingId, { page_path: location.pathname })
    });

    return unlisten;
  }, [listen]);
}
