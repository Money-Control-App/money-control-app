import React, { createContext, useContext, useState } from 'react';
const DataContext = createContext();

//  Тут зберігаються дані з налаштувань юзера data
export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});

    const setValues = (values) => {
        setData(prevData => ({
            ...prevData,
            ...values,
        }))
    }
    console.log(data)
    
    return (
        <DataContext.Provider value={{ data, setValues }} >
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => useContext(DataContext);
