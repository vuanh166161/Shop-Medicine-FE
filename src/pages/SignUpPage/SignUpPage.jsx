import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Import icon từ Ant Design
import './SignUpPage.js'; // Import CSS styles
import InputForm from "../../components/InputForm/InputForm.jsx";
import ButtonCom from "../../components/Button/ButtonCom.jsx";
import * as UserService from "../../services/UserService.js"
import { useMutationHooks } from "../../hooks/useMutationHook.js";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = (setState) => {
        setState((prevState) => !prevState);
    };

    const [name, setName] = useState('')
    const handleOnchangeName = (value) => {
        setName(value)
    }

    const [email, setEmail] = useState('')
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const [password, setPassword] = useState('')
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const [confirmPassword, setConfirmPassword] = useState('')
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )

    const { data, isLoading, isSuccess, isError } = mutation



    const handleSignUp = () => {
        mutation.mutate({
            name,
            email,
            password,
            confirmPassword
        })
    }

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleNavigateSignIn()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    return (
        <div className="main-w3layouts wrapper">
            <h1>Sign Up</h1>
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form >
                        <InputForm placeholder="User name" value={name} onChange={handleOnchangeName} />
                        <InputForm placeholder="abc@gmaill.com" value={email} onChange={handleOnchangeEmail} />
                        <div className="password-input">
                            <InputForm type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={handleOnchangePassword} />
                            <span
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility(setShowPassword)}
                            >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>
                        <div className="password-input">
                            <InputForm type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                            <span
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>
                        {/* <div className="wthree-text">
                            <label className="anim">
                                <input type="checkbox" className="checkbox" required />
                                <span>I Agree To The Terms & Conditions</span>
                            </label>
                            <div className="clear"></div>
                        </div> */}
                        <>
                            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                            <ButtonCom
                                disabled={!email.length || !password.length || !confirmPassword.length}
                                onClick={handleSignUp}
                                size={40}
                                styleButton={{
                                    background: '#76b852',
                                    height: '48px',
                                    width: '100%',
                                    border: 'none',
                                    borderRadius: '4px',
                                    margin: '26px 0 10px'
                                }}
                                textbutton={'Sign Up'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonCom>
                        </>
                    </form>
                    <p>Do you have an Account? <span onClick={handleNavigateSignIn} style={{ color: "white", cursor: "pointer" }}>Sign in!</span></p>
                    <p>Forgot password?</p>
                </div>
            </div>
            <div className="colorlibcopy-agile">
                <p></p>
            </div>
            <ul className="colorlib-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}

export default SignUpPage;
