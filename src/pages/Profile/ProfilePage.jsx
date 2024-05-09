import React, { useEffect, useState } from "react";
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLable, WrapperUploadFile } from "./ProfilePage";
import InputForm from "../../components/InputForm/InputForm.jsx";
import ButtonCom from "../../components/Button/ButtonCom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService.js"
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { updateUser } from "../../redux/slides/userSlice";
import { Button, Upload } from "antd";
import {UploadOutlined} from "@ant-design/icons"
import { getBase64 } from "../../utils";



const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)
    const [address, setAddress] = useState(user?.address)
    const [city, setCity] = useState(user?.city)
    const [avatar, setAvatar] = useState(user?.avatar)
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const {data, isSuccess, isError} = mutation

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPhone(user?.phone)
        setAddress(user?.address)
        setCity(user?.city)
        setAvatar(user?.avatar)
    },[user])

    useEffect(() => {
        if(isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if(isError){
            message.error()
        }
    },[isSuccess, isError])

    const dispatch =useDispatch();

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data, access_token: token}))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeCity = (value) => {
        setCity(value)
    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        mutation.mutate({ id: user?.id, name, email, phone, address, city, avatar, access_token : user?.access_token})
        
    }
    return (
        <div style={{width:'1270px', margin:'0 auto', height:'500pxư'}}>
            
            <WrapperContentProfile>
            <WrapperHeader>User information</WrapperHeader>
                <WrapperInput>
                <WrapperLable htmlFor="name">User name</WrapperLable>
                <InputForm style={{width: '300px'}} id="name" value={name} onChange={handleOnchangeName}/>
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                <WrapperInput>
                <WrapperLable htmlFor="email">Email</WrapperLable>
                <InputForm style={{width: '300px'}} id="email" value={email} onChange={handleOnchangeEmail}/>
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                <WrapperInput>
                <WrapperLable htmlFor="phone">Phone</WrapperLable>
                <InputForm style={{width: '300px'}} id="phone" value={phone} onChange={handleOnchangePhone}/>
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                <WrapperInput>
                <WrapperLable htmlFor="address">Address</WrapperLable>
                <InputForm style={{width: '300px'}} id="address" value={address} onChange={handleOnchangeAddress}/>
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                <WrapperInput>
                <WrapperLable htmlFor="city">City</WrapperLable>
                <InputForm style={{width: '300px'}} id="city" value={city} onChange={handleOnchangeCity}/>
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                <WrapperInput>
                <WrapperLable htmlFor="avatar">Avatar</WrapperLable>
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </WrapperUploadFile>
                                {avatar && (
                                    <img src={avatar} style={{height: '60px',width: '60px', borderRadius: '50%', objectFit:'cover'}} alt="avatar"/>
                                )}
                {/* <InputForm style={{width: '300px'}} id="avatar" value={avatar} onChange={handleOnchangeAvatar}/> */}
                <ButtonCom
                        onClick={handleUpdate}
                                size={40}
                                styleButton={{
                                    height: '30px',
                                    width: 'fit-content',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '2px 6px 6px'
                                }}
                                textbutton={'Edit'}
                                styleTextButton={{ color: 'rgb(26,149,255)', fontSize: '15px', fontWeight: '700', textDecoration: 'underline', fontStyle: 'italic', textTransform: 'capitalize'   }}
                            ></ButtonCom>
                </WrapperInput>
                
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage