import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/useAuth";
import "../../styles/index.css"

interface Values{
    email: string;
    password: string;
}

export const Login = () => {
    const initialValues: Values = {email: '', password: ''};

    const [message, setMessage] = useState(""); 

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
            setMessage("Invalid email or password")
        }
    }
    
    let errorMessage = null;
    if(message){
        errorMessage = (
            <div className="error-message">
                <img src="src\error-failure-10382.svg" alt="" />
                <p>{message}</p>
            </div>
        )
    }
    return(
        <div className="container">
            <Formik
            initialValues={initialValues}
            onSubmit={(
                values: Values
            ) =>{
                onFinish(values);
            }}
            >
                <Form className="form">
                    <img src="src\B2BitLogo.svg" alt="Logo of B2BIT Company"/>
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
            {errorMessage}
            
        </div>
    )
}