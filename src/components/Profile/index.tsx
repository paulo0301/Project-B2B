import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth"
import { getUserData } from "../../context/AuthProvider/util";
import "../../styles/profile.css"

export function Profile(){
    const auth = useAuth();
    const navigate = useNavigate();

    function useLogout(){
        auth.logout();
        navigate('/');
    }


    return(
        <div className="container-profile">
            <div className="container-btn-logout">
                <button className="btn-logout" onClick={useLogout}>Logout</button>
            </div>
            <div className="container-infos">
                <div>
                    <div className="container-picture">
                        <p>Profile picture</p>
                        <img src={auth.picture} alt="Picture"/>
                    </div>
                    <div>
                        <p>Your <b>Name</b></p>
                        <p className="info-profile">{auth.name} {auth.last_name}</p>
                    </div>
                    <div>
                        <p>Your <b>E-mail</b></p>
                        <p className="info-profile">{auth.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}