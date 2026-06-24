"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const PageLoaderContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });

export const usePageLoader = () => useContext(PageLoaderContext);

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Non-blocking trigger to fire entrance animations after initial paint
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLoaderContext.Provider value={{ isLoaded }}>
      {children}
    </PageLoaderContext.Provider>
  );
}
