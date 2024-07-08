import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    auth:[],
    currentUser: {},
    userToken: null,
    setAuth: () => { },
    setCurrentUser: () => { },
    setUserToken: () =>  {},

});



export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '' );
    const [auth, _setAuth] = useState([
        localStorage.getItem('NAME') || '',
        localStorage.getItem('ROLE') || ''
    ]);

    const setAuth = (name, role) => {
        if ((name != undefined || name != null) && (role != undefined || role != null)) {
            localStorage.setItem('NAME', name)
            localStorage.setItem('ROLE', role)
        }else {
            localStorage.removeItem('NAME')
            localStorage.removeItem('ROLE')
        }
        _setAuth([name, role])
    }

    const setUserToken = (token) => {
      if (token) {
        localStorage.setItem('TOKEN', token)
      } else {
        localStorage.removeItem('TOKEN')
      }

      _setUserToken(token);

    }

    return(
        <StateContext.Provider 
        value={{
            auth,
            currentUser,
            setCurrentUser,
            setAuth,
            userToken,
            setUserToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)