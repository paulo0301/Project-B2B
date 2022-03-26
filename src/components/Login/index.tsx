import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import "../../styles/index.css"
import { VscError } from "react-icons/vsc"
import { IconContext } from "react-icons";

interface Values{
    email: string;
    password: string;
}

export const Login = () => {
    const initialValues: Values = {email: '', password: ''};

    const [errorMessageVisible, setErrorMessageVisible] = useState(false); 

    const auth = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(auth.token);
        if(auth.token){
            navigate("/profile");
        }
    }, [])


    async function onFinish(values: Values){
        try {
            await auth.authenticate(values.email, values.password);

            navigate('/profile');

        } catch (error) {
            setErrorMessageVisible(true);
            console.log(error);
        }
    }


    return(
        <div className="container">
            {errorMessageVisible && (
                <div className="error-message">
                    <IconContext.Provider value={{className: "react-icons"}}>
                        <VscError />
                    </IconContext.Provider>
                    <p>Invalid email or password</p>
                 </div>
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={(
                    values: Values
                ) => {
                onFinish(values);
            }}
            >
                <Form className="form" onChange={() => {errorMessageVisible && setErrorMessageVisible(false)}}>
                    <img src="src\B2BitLogo.svg" alt="B2BIT Company logo"/>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <Field type="email" name="email" id="email" placeholder="@gmail.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" placeholder="********" required/>
                    </div>
                    <button className="btn-login" type="submit">Sign In</button>
                </Form>
            </Formik>
        </div>
    )
}