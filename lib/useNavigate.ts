"use client";

import { useRouter } from "next/navigation";

export type NavigateOptions = {
  replace?: boolean;
};

/**
 * A small wrapper to provide a React Router-like `useNavigate` API while
 * using Next.js App Router under the hood.
 */
export function useNavigate() {
  const router = useRouter();

  return (to: string, options?: NavigateOptions) => {
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}
