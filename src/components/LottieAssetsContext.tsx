import { createContext, useContext } from "react";

export type LottieAssets = {
  sun?: unknown | null;
  leaves?: unknown | null;
};

const Ctx = createContext<LottieAssets>({});

export function LottieAssetsProvider({
  value,
  children,
}: {
  value: LottieAssets;
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLottieAssets() {
  return useContext(Ctx);
}
