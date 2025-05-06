import { createContext, useState, useCallback } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("bankUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const login = useCallback((userData) => {
    const completeUserData = {
      ...userData,
      balance: userData.balance || 0,
      accountType: userData.accountType || "Savings",
    };
    setUser(completeUserData);
    localStorage.setItem("bankUser", JSON.stringify(completeUserData));
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("bankUser");
    localStorage.removeItem("balance");
  }, []);
  const updateUser = useCallback((updatedData) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...updatedData };
      localStorage.setItem("bankUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};