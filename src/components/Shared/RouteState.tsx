import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type RouteStateData = { isRouteChanging: boolean; loadingKey: number };

export type RouteStateProps = {
  children: (params: RouteStateData) => JSX.Element;
};

export const useRouteState = (): RouteStateData => {
  const router = useRouter();
  const [state, setState] = useState<RouteStateData>({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = (
      path: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = (
      path: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  return state;
};

const RouteState = ({ children }: RouteStateProps) => {
  const state = useRouteState();
  return children(state);
};

export default RouteState;
