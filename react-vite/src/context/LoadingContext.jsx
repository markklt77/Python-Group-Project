import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <LoadingContext.Provider
            value={{ isLoading, setIsLoading }}
        >
            { children }
        </LoadingContext.Provider>
    )
}
