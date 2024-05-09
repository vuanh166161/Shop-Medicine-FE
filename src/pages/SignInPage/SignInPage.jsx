import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; // Import icon từ Ant Design
import './SignInPage.js'; // Đảm bảo import CSS đúng
import InputForm from "../../components/InputForm/InputForm.jsx";
import ButtonCom from "../../components/Button/ButtonCom.jsx";
import * as UserService from "../../services/UserService.js"
import { useMutationHooks } from "../../hooks/useMutationHook.js";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent.jsx";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice.js";
import Cookies from 'js-cookie'; // Thêm dòng này


const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false); // State để theo dõi trạng thái ẩn/hiện của password
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch =useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Đảo ngược trạng thái ẩn/hiện password
    };
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }
   
    const [email, setEmail] = useState('')
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const [password, setPassword] = useState('')
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const mutation = useMutationHooks(
        data => UserService.signinUser(data)
    )

    const {data, isSuccess, isError} = mutation

    useEffect(() => {
        if(isSuccess){
            if(location?.state){
                navigate(location?.state)
            }else{
                navigate('/')
            }
            Cookies.set('access_token', data?.access_token); 
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            Cookies.set('refresh_token', data?.refresh_token);
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if(data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if(decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
    },[isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token, refreshToken}))
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }

    return (
        <div className="main-w3layouts wrapper">
            <h1>Sign In</h1>
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form>
                        <InputForm placeholder="Email" value={email} onChange={handleOnchangeEmail}/>
                        <div className="password-input">
                            <InputForm type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={handleOnchangePassword}/>
                            <span className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </span>
                        </div>
                        <div className="wthree-text">
                            <div className="clear"></div>
                        </div>
                        <>
                        {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
                        <ButtonCom
                        disabled={!email.length || !password.length }
                        onClick={handleSignIn}
                                size={40}
                                styleButton={{
                                    background: '#76b852',
                                    height: '48px',
                                    width: '100%',
                                    border: 'none',
                                    borderRadius: '4px',
                                    margin: '26px 0 10px'
                                }}
                                textbutton={'Sign In'}
                                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonCom>
                        </>
                    </form>
                    <p>Don't have an Account? <span onClick={handleNavigateSignUp} style={{cursor:'pointer', color:'white'}}>Create!</span></p>
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

export default SignInPage;
