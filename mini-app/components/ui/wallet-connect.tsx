"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMiniAppContext } from "@/components/context/miniapp-provider";

export default function WalletConnect() {
  const { signer } = useMiniAppContext();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!signer) return;
      const addr = await signer.getAddress();
      setAddress(addr);
    };
    load();
  }, [signer]);

  const connect = async () => {
    if (!window.ethereum) return;
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newSigner = provider.getSigner();
    setAddress(await newSigner.getAddress());
  };

  return (
    <div className="flex items-center gap-4">
      {address ? (
        <span className="text-sm">Connected: {address.slice(0, 6)}…{address.slice(-4)}</span>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
