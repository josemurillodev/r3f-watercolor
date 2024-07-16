import React, { ReactNode, useContext, useMemo, useState } from 'react';

import { StoreType } from 'leva/dist/declarations/src/types';
import { noop } from '@/helpers/helper-util';

interface LevaContextState {
  animate: boolean;
  levaStore?: StoreType;
  setAnimate: (e: boolean) => void;
  setLevaStore: (e?: StoreType) => void;
}

const defaultLeva: LevaContextState = {
  animate: false,
  setLevaStore: noop,
  setAnimate: noop,
};

export const LevaContext = React.createContext(defaultLeva);

export function LevaProvider({ children }: { children: ReactNode }) {
  const [levaStore, setLevaStore] = useState<StoreType>();
  const [animate, setAnimate] = useState(true);

  const value = useMemo(
    () => ({
      levaStore,
      setLevaStore,
      animate,
      setAnimate,
    }),
    [levaStore, setLevaStore, animate, setAnimate]
  );

  return <LevaContext.Provider value={value}>{children}</LevaContext.Provider>;
}

export const useLevaContext = () => useContext(LevaContext);
