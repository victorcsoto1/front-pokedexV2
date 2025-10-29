import { createContext, useContext, useState } from "react";
import LoaderScreen from "../components/loaders/LoaderScreen";

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({children}) => {

    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }} >
            {loading && <LoaderScreen />}
            {children}
        </LoadingContext.Provider>
    )
}