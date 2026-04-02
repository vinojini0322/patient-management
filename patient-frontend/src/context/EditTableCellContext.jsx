import { createContext, useContext } from "react";
const EditableCellContext = createContext(null);

export function EditableCellProvider({ value, children }) {
  return (
    <EditableCellContext.Provider value={value}>
      {children}
    </EditableCellContext.Provider>
  );
}

export function useEditableCellContext() {
  const context = useContext(EditableCellContext);

  if (!context) {
    throw new Error(
      "useEditableCellContext must be used inside EditableCellProvider",
    );
  }
  return context;
}
