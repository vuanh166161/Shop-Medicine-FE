import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { UserOutlined, AppstoreOutlined, ShoppingOutlined} from '@ant-design/icons'
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserManagement from "../../components/UserManagement/UserManagement.jsx";
import ProductManagement from "../../components/ProductManagement/ProductManagement.jsx";
import OrderManagement from "../../components/OrderManagement/OrderManagement.jsx";


const AdminPage = () => {
  const items = [
    getItem('User Management', 'users', <UserOutlined />),
    getItem('Product Management', 'products', <AppstoreOutlined />),
    getItem('Order Management', 'orders', <ShoppingOutlined />)

  ];
  const [keySelected,  setKeySelected] = useState('')

  const renderPage = (key) => {
    switch(key){
      case 'users':
        return (
          <UserManagement/>
        )
        case 'products':
          return (
            <ProductManagement/>
          )
          case 'orders':
            return (
              <OrderManagement/>
            )
        default:
          return <></>
    }
  }
 
  const handleOnCLick = ({  key}) => {
    setKeySelected(key)
  }
  return (
    <>
    
    <HeaderComponent isHiddenSearch isHiddenCart />
      <h1 style={{ color: 'black', textAlign: 'left', fontSize: '20px', lineHeight: '20px', marginTop: '5px', marginLeft: '10px' }}>Admin Management</h1>
    <div style={{display: 'flex'}}>
      <Menu
        mode="inline"
        style={{
          width: 256,
          boxShadow: '1px 1px 2px #ccc',
          height: '100vh'
        }}
        items={items}
        onClick={handleOnCLick}
      />
      <div style={{flex:1, padding: '15px'}}>
        {renderPage(keySelected)}
      </div>
    </div>
    </>
  )
}

export default AdminPage;
