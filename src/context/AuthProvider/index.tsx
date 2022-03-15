import React, {createContext, useEffect, useState} from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage, removeUserLocalStorage, getUserData } from "./util";

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({children}: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if(user){
            setUser(user);
        }
    }, [])

    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = {token: response.tokens.access, email, name: response.user.name, last_name: response.user.last_name, picture: response.user.avatar.image_high_url};
        
        setUser(payload);
        setUserLocalStorage(payload);
    }

    function logout(){
        setUser(null);
        removeUserLocalStorage();
    }
    
    return(
        <AuthContext.Provider value={{...user, authenticate, logout}}>
            {children}
        </AuthContext.Provider>
    )
}