import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin]
}
