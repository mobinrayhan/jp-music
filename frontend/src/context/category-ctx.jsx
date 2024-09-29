"use client";

import { createContext, useContext, useState } from "react";

const CategoryCtx = createContext();

export default function CategoryCtxProvider({ children }) {
  const [category, setCategory] = useState(null);

  const ctxValue = {
    category,
    handleCategory: (cat) => {
      setCategory(cat);
    },
  };

  return (
    <CategoryCtx.Provider value={ctxValue}>{children}</CategoryCtx.Provider>
  );
}

export function useCategoryCtx() {
  const ctx = useContext(CategoryCtx);

  if (!ctx || ctx === undefined) {
    throw new Error(
      "You Can not use useCategoryCtx outside of the CategoryCtx provider",
    );
  }

  return ctx;
}
