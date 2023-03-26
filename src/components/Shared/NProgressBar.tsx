import { Progress, ProgressProps } from "@chakra-ui/react";
import { useNProgress } from "@tanem/react-nprogress";

export type NProgressBarProps = Omit<ProgressProps, "isIndeterminate"> & {
  isAnimating: boolean;
};

const NProgressBar = ({ isAnimating, ...others }: NProgressBarProps) => {
  const { animationDuration, progress, isFinished } = useNProgress({
    isAnimating,
  });

  if (isFinished) {
    return null;
  }

  return (
    <Progress
      sx={{
        "*[role=progressbar]": {
          transition: `width ${animationDuration}ms linear`,
        },
      }}
      value={progress * 100}
      {...others}
    />
  );
};

export default NProgressBar;
