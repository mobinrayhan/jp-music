"use client";
import { createContext, useContext, useState } from "react";

const VerifyEmailCtx = createContext();

export default function VerifyEmailCtxProvider({ children }) {
  const [verifyState, setVerifyState] = useState(null);

  const ctxValue = {
    verifyState,
    onSetVerifyState: (message, isSuccess) => {
      setVerifyState({ isSuccess, message });
    },
  };

  return (
    <VerifyEmailCtx.Provider value={ctxValue}>
      {children}
    </VerifyEmailCtx.Provider>
  );
}

export function useVerifyEmailCtx() {
  const ctx = useContext(VerifyEmailCtx);

  if (!ctx || ctx === undefined) {
    throw new Error(
      "You Cannon Use useVerifyEmailCtx outside of the VerifyEmailCtxProvider",
    );
  }
  return ctx;
}
