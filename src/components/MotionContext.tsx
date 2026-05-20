import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Ctx = { reduced: boolean; setReduced: (v: boolean) => void };
const MotionCtx = createContext<Ctx>({ reduced: false, setReduced: () => {} });

const KEY = "sol-soil-reduced-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReducedState] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved !== null) {
        setReducedState(saved === "1");
        document.documentElement.dataset.reducedMotion = saved === "1" ? "true" : "false";
        return;
      }
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedState(m.matches);
      document.documentElement.dataset.reducedMotion = m.matches ? "true" : "false";
    } catch {
      /* ignore */
    }
  }, []);

  const setReduced = useCallback((v: boolean) => {
    setReducedState(v);
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
      document.documentElement.dataset.reducedMotion = v ? "true" : "false";
    } catch {
      /* ignore */
    }
  }, []);

  return <MotionCtx.Provider value={{ reduced, setReduced }}>{children}</MotionCtx.Provider>;
}

export function useReducedMotionPref() {
  return useContext(MotionCtx);
}
