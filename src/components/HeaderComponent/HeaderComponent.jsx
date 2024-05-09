import { Badge, Button, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderAcount, WrapperContentPopup } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import SearchButton from "../SearchButton/SearchButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService.js';
import { resetUser } from '../../redux/slides/userSlice'
import { searchProduct } from "../../redux/slides/productSlice";




const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [ isOpenPopup, setIsOpenPopup] = useState(false)
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateHome = () => {
        navigate('/')
    }

    const handleNavigateProduct = () => {
        navigate('/products')
    }

    const handleLogout = async () => {
        await UserService.logoutUser()
        navigate('/sign-in')
        dispatch(resetUser())
    }

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleNavigate('profile')}>Profile</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleNavigate('admin')}>Management</WrapperContentPopup>
            )}
            {user?.isSeller && (
                <WrapperContentPopup onClick={() => handleNavigate('seller')}>Management</WrapperContentPopup>
            )}

            <WrapperContentPopup onClick={() => handleNavigate(`my-order`)}>Order</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>Log out</WrapperContentPopup>
        </div>
    )
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    const handleNavigate = (type) => {
        if(type === 'profile') {
            navigate('/profile-user')
        } else if(type === 'admin'){
            navigate('/system/admin')
        }else if(type === 'seller'){
            navigate('/system/seller')
        }
        else if(type === 'my-order') {
            navigate('/my-order',{ state : {
                id: user?.id,
                token : user?.access_token
              }
            })
          } else {
            handleLogout()
        }
    }

    return (
        <div>
            <WrapperHeader style={{ alignItems: 'center' }}>
                <Col span={2} onClick={handleNavigateHome} style={{ cursor: 'pointer' }}><WrapperTextHeader>Home</WrapperTextHeader></Col>
                {/* {!isHiddenCart && ( */}
                <Col span={2} onClick={handleNavigateProduct} style={{ cursor: 'pointer' }}><WrapperTextHeader>Product</WrapperTextHeader></Col>
                {/* )} */}
                {/* {!isHiddenCart && ( */}
                {/* <Col span={2}><WrapperTextHeader onClick={() => navigate('/product/type')} style={{cursor: 'pointer'}}>Types</WrapperTextHeader></Col> */}
                {/* )} */}
                {/* {!isHiddenCart && ( */}
                <Col span={2}><WrapperTextHeader onClick={() => navigate('/about')} style={{cursor: 'pointer'}}>About Us</WrapperTextHeader></Col>
                {/* )} */}
                {/* {!isHiddenCart && ( */}
                <Col span={2}><WrapperTextHeader onClick={() => navigate('/guides')} style={{cursor: 'pointer'}}>Guides</WrapperTextHeader></Col>
                {/* )} */}

                {!isHiddenSearch && (
                    <Col span={12}> <SearchButton
                        bordered={false}
                        size="large"
                        // large
                        placeholder="Search..."
                        textButton=""
                        onChange={onSearch}
                    /></Col>
                )}
                <Col span={2} style={{ display: 'flex', gap: '40px', marginRight: '120px', marginLeft: 'auto' }}>
                    {!isHiddenCart && (
                        <WrapperHeaderAccount onClick={() => navigate('/order')} style={{cursor:'pointer'}}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: '32px', color: '#fff', marginLeft: '25px' }} />
                            </Badge>
                        </WrapperHeaderAccount>
                    )}

                    <WrapperHeaderAccount style={{}}>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={{ height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}
                        {user?.access_token ? (
                            <Popover content={content} trigger="click" open={isOpenPopup}>
                                <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)} >{userName?.length ? userName : user?.email}</div>
                            </Popover>
                        ) : (
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderAcount>Login/Register</WrapperTextHeaderAcount>
                                <div>
                                    <WrapperTextHeaderAcount>Account</WrapperTextHeaderAcount><CaretDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperHeaderAccount>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent