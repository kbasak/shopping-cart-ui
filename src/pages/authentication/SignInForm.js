import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginUINav from "./LoginUINav";
import "../../App.css";
import LoginStatus from "../../util/APICalls";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        //console.log(value + " " + name);
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const userdata = {
            username: event.target.email.value,
            password: event.target.password.value
        }
        if (event.target.email.value !== '' && event.target.password.value !== '') {
            try {
                var loginResponse = await LoginStatus(userdata);
                localStorage.setItem("name", loginResponse.name);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Login Successful",
                    showConfirmButton: false,
                    timer: 2000,
                    width: '300px',
                    background: '#12130f',
                    color: '#00ff00',
                });
                console.log(loginResponse);
                navigate('/home');
            } catch (exception) {
                if (exception.response.data.errorMessage === "Invalid Password") {
                    Swal.fire({
                        position: "center",
                        title: exception.response.data.errorMessage + "!!!",
                        text: "Please try again...",
                        icon: "error",
                        width: '400px',
                        background: '#12130f',
                        confirmButtonText: "Try Again",
                        color: 'white',
                        allowEnterKey: false,
                    })
                } else {
                    Swal.fire({
                        position: "center",
                        title: "Are you registered ?",
                        text: exception.response.data.errorMessage,
                        icon: "question",
                        width: '400px',
                        background: '#12130f',
                        confirmButtonText: "SignUp!",
                        cancelButtonText: "Try Again",
                        color: 'white',
                        allowEnterKey: false,
                        showCancelButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/sign-up");
                        } else if (result.isDenied) {
                            navigate("/");
                        }
                    });
                }
            }
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                text: "Enter Credentials to Login",
                showConfirmButton: false,
                timer: 1500,
                width: '300px',
                background: '#12130f',
                color: 'white',
            });
        }
    }


    return (
        <div className="App">
            <div className="appAside">
                {/* <img src={require('../../image/cyber-security-banner.jpg')} alt="Authentication" /> */}
            </div>
            <div className="appForm">
                <LoginUINav activeTab={"signin"} />
                <div className="formCenter">
                    <form className="formFields" onSubmit={handleSubmit} autoComplete="on">
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                E-Mail Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="formFieldInput"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="password">
                                Password
                            </label>
                            <input
                                type={
                                    showPassword ? "text" : "password"
                                }
                                id="password"
                                className="formFieldInput"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                            <div style={{ float: 'right', marginRight: '16%', marginTop: '-4.5%' }}>
                                <span className='toggleicon' onClick={() =>
                                    setShowPassword((prev) => !prev)}>
                                    {showPassword ?
                                        <FontAwesomeIcon icon={faEye} color='grey' />
                                        :
                                        <FontAwesomeIcon icon={faEyeSlash} color='grey' />}
                                </span>
                            </div>
                        </div>
                        <div className="formField">
                            <button className="formFieldButton" type="submit">Sign In</button>{" "}
                            <Link to="/sign-up" className="formFieldLink">
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default SignInForm;
