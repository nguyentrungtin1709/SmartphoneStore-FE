import {createContext, useState} from "react";

export const SmartphonesContext = createContext(null)

export const SmartphonesContextProvider = ({ children }) => {
    const [smartphones, setSmartphones] = useState()

    return (
       <SmartphonesContext.Provider value={[smartphones, setSmartphones]}>
           {children}
       </SmartphonesContext.Provider>
    )
}