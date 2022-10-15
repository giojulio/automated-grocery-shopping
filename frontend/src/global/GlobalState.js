import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalState = (props) => {
    const [userId, setUserId ] = useState('')
    
    return(
        <GlobalContext.Provider value={{userId, setUserId}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalState