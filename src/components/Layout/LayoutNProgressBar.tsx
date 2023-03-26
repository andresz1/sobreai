import { useRouteState } from "@/components/Shared/RouteState";

import SharedNProgressBar, { NProgressBarProps } from "../Shared/NProgressBar";

export type LayoutNProgressBarProps = Omit<NProgressBarProps, "isAnimating">;

export const LayoutNProgressBar = (props: LayoutNProgressBarProps) => {
  const { loadingKey: key, isRouteChanging } = useRouteState();

  return (
    <SharedNProgressBar
      key={key}
      colorScheme="blackAlpha"
      position="fixed"
      top="0"
      width="100%"
      size="xs"
      zIndex="banner"
      isAnimating={isRouteChanging}
      {...props}
    />
  );
};

export default LayoutNProgressBar;
