"use client";

import { createContext, useContext, useEffect, useState } from "react";
import sdk, { Context } from "@farcaster/miniapp-sdk";
import { MiniAppSDK } from "@farcaster/miniapp-sdk/dist/types";
import { ethers } from "ethers";
import { TRENDY_CONTRACT_ADDRESS, TRENDY_ABI } from "@/lib/contracts";

export interface MiniAppContext {
  sdk: MiniAppSDK;
  context: Context.MiniAppContext | undefined;
  isInMiniApp: boolean | undefined;
  provider: ethers.providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
  contract: ethers.Contract | undefined;
}

const defaultSettings: MiniAppContext = {
  sdk,
  context: undefined,
  isInMiniApp: undefined,
  provider: undefined,
  signer: undefined,
  contract: undefined,
};

const MiniAppContext = createContext<MiniAppContext>(defaultSettings);

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<MiniAppContext>(defaultSettings);

  useEffect(() => {
    const ready = async () => {
      await Promise.all([
        sdk.context
          .then((ctx) =>
            setContext((old) => ({ ...old, context: ctx }))
          )
          .catch(console.error),
        sdk
          .isInMiniApp()
          .then((isIn) =>
            setContext((old) => ({ ...old, isInMiniApp: isIn }))
          )
          .catch(console.error),
      ]);

      await sdk.actions.ready().catch(console.error);
    };

    ready();
  }, []);

  // Wallet & contract helper
  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      TRENDY_CONTRACT_ADDRESS,
      TRENDY_ABI,
      signer
    );
    setContext((old) => ({
      ...old,
      provider,
      signer,
      contract,
    }));
  }, []);

  return (
    <MiniAppContext.Provider value={context}>
      {children}
    </MiniAppContext.Provider>
  );
}

export function useMiniAppContext() {
  return useContext(MiniAppContext);
}
