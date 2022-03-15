import { Api } from "../../services/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('user');

    if(!json){
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}
export function removeUserLocalStorage() {
    localStorage.clear();
}
export async function LoginRequest(email: string, password: string){
    try{
        const request = await Api.post('tokens/', {email, password})

        return request.data;
    }catch(errors){
        return null;
    }
}

export async function getUserData(token: string){
    try{
        const request = await Api.get('profile/',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } )

        //console.log(request.data);
        return request.data;
    }
    catch(errors){
        return null;
    }
}