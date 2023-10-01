import React, { useState, useEffect } from 'react';
import './Login.css'
import dogImg from '../../assets/dog.jpg';
import { auth } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const [hasAccount, setHasAccount] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async (data) => {
        try {
            await auth.signInWithEmailAndPassword(data["Email"], data["Password"])
        } catch (error) {
            // eslint-disable-next-line default-case
            switch(error.code) {
                case "auth/wrong-password": 
                    setPasswordError(error.message);
                    break;
                case "auth/user-not-found":
                    setEmailError(error.message);
                    break;
            }
        }
    }

    const handleSignUp = async (data) => {
        try {
            await auth.createUserWithEmailAndPassword(data["Email"], data["Password"]);
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                setEmailError(error.message);
            }
        }
    }

    const authListen = auth.onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          navigate('/Dog-Gallery')
        }
      });
    
      // set user
      useEffect(() => {
        authListen();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return (
        <div className="login-wrapper">
            <h1>Welcome To Dog Breeds</h1>
            <div className="login-content">
                <div className="login-image">
                    <img src={dogImg} alt="imgLogin" />
                </div>
                <div className="login-form-wrapper">
                    <div className="login-form">
                        {hasAccount ? (
                            <>
                                <div className="login-icon">
                                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                                </div>
                                <h2>Sign in</h2>
                                <form onSubmit={handleSubmit(handleLogin)}>
                                    <div className="input-item">
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="username@gmail.com"
                                            {...register("Email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/i })}
                                        />
                                        {errors.Email && errors.Email.type === "required" && <span className="text-danger">This is required</span>}
                                        {errors.Email && errors.Email.type === "pattern" && <span className="text-danger">username@gmail.com</span>}
                                        <span  className="text-danger">{emailError}</span>
                                    </div>
                                    <div className="input-item">
                                        <label>Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="username123"
                                            {...register("Password", { required: true, pattern: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i })}
                                        />
                                        {errors.Password && errors.Password.type === "required" && <span className="text-danger">This is required</span>}
                                        {errors.Password && errors.Password.type === "pattern" && <span className="text-danger">Password should be 8 chars minimum and at least 1 number</span> }
                                        <span  className="text-danger">{passwordError}</span>
                                    </div>
                                    <button className="btn-submit" type="submit">sign in</button>
                                    <p className="login-question">Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="login-icon">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </div>
                                <h2>Sign up</h2>
                                <form onSubmit={handleSubmit(handleSignUp)}>
                                    <div className="input-item">
                                        <label>Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="username@gmail.com"
                                            {...register("Email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/i })}
                                        />
                                        {errors.Email && errors.Email.type === "required" && <span className="text-danger">This is required</span>}
                                        {errors.Email && errors.Email.type === "pattern" && <span className="text-danger">username@gmail.com</span>}
                                        <span className="text-danger">{emailError}</span>
                                    </div>
                                    <div className="input-item">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="username123"
                                            {...register("Password", { required: true, pattern: /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i })}
                                        />
                                        {errors.Password && errors.Password.type === "required" && <span className="text-danger">This is required</span>}
                                        {errors.Password && errors.Password.type === "pattern" && <span className="text-danger">Password should be 8 chars minimum and at least 1 number</span> }
                                    </div>
                                    <button className="btn-submit" type="submit">sign up</button>
                                    <p className="login-question">Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;