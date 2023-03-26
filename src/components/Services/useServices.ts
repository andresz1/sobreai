import { useMemo } from "react";

import { ServicesFactory } from "@/services";

export const useServices = () => {
  return useMemo(() => {
    return ServicesFactory.create();
  }, []);
};
