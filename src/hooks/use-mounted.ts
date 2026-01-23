import { useEffect, useState } from "react";

/**
 * Hook to detect if component has mounted on the client side.
 * Useful for preventing hydration mismatches with animations.
 *
 * @returns true after component has mounted on the client
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
