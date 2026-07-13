import { useContext } from "react";
import PortalTransitionContext from "./portalTransitionContext";

export function usePortalTransition() {
  const ctx = useContext(PortalTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePortalTransition must be used within a PortalTransitionProvider"
    );
  }
  return ctx;
}
