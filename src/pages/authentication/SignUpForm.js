import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginUINav from "./LoginUINav";
import "../../App.css";
import { RegistrationStatus } from "../../util/APICalls";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
//Something@123
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [hasAgreed, setHasAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    function handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        if (name === "name") {
            setName(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "hasAgreed") {
            setHasAgreed(value);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const userdata = {
            username: event.target.email.value,
            name: event.target.name.value,
            password: event.target.password.value
        }
        if (event.target.email.value !== '' && event.target.password.value !== '' && event.target.name.value !== '') {
            if (!event.target.hasAgreed.value) {
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    text: "Please Accept T&C",
                    showConfirmButton: false,
                    timer: 2000,
                    width: '250px',
                    background: '#12130f',
                    color: '#ffa288'
                });
                return;
            }
            try {
                var registrationResponse = await RegistrationStatus(userdata);
                console.log(registrationResponse);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "Registration Successful...",
                    showConfirmButton: false,
                    timer: 2000,
                    width: '300px',
                    background: '#12130f',
                    color: '#00ff00',
                });
                navigate('/');
            } catch (exception) {
                if (exception.response.data.username) {
                    Swal.fire({
                        position: "center",
                        text: "Please enter valid email",
                        //text: exception.response.data.username,
                        icon: "warning",
                        width: '300px',
                        background: '#12130f',
                        confirmButtonText: "OK",
                        color: 'white',
                        allowEnterKey: false,
                    })
                } else if (exception.response.data.password) {
                    Swal.fire({
                        position: "center",
                        text: exception.response.data.password,
                        icon: "warning",
                        width: '400px',
                        background: '#12130f',
                        confirmButtonText: "OK",
                        color: 'white',
                        allowEnterKey: false,
                    })
                } else if (exception.response.data.errorMessage) {
                    Swal.fire({
                        position: "center",
                        html: exception.response.data.errorMessage + "<br><br> If you are already registered,<br> click on sign-in...",
                        icon: "warning",
                        width: '400px',
                        background: '#12130f',
                        color: 'white',
                        allowEnterKey: false,
                        confirmButtonText: "SignIn",
                        denyButtonText: "Cancel",
                        showDenyButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/');
                        } else if (result.isDenied) {
                            Swal.fire({
                                position: "center",
                                icon: "info",
                                text: "Use different username",
                                showConfirmButton: false,
                                timer: 2000,
                                width: '300px',
                                background: '#12130f',
                                color: '#ffce5b',
                            });
                        }
                    });
                }
                console.log(exception);
            }
            console.log(userdata);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                text: "Enter All Details to SignUp!",
                showConfirmButton: false,
                timer: 2000,
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
                <LoginUINav activeTab={"signup"} />
                <div className="formCenter">
                    <form onSubmit={handleSubmit} className="formFields" autoComplete="off">
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="formFieldInput"
                                placeholder="Enter your full name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                E-Mail Address
                            </label>
                            <input
                                type="text"
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
                            <label className="formFieldCheckboxLabel">
                                <input
                                    className="formFieldCheckbox"
                                    type="checkbox"
                                    name="hasAgreed"
                                    value={hasAgreed}
                                    onChange={handleChange}
                                />{" "}
                                I agree all statements in{" "}
                                <a href="null" className="formFieldTermsLink">
                                    terms of service
                                </a>
                            </label>
                        </div>

                        <div>
                            <button disabled={!hasAgreed} className="formFieldButton" style={{ backgroundColor: !hasAgreed && '#8100009e' }}>Sign Up</button>{" "}
                            <Link to="/" className="formFieldLink">
                                I'm already member
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );

}
export default SignUpForm;
