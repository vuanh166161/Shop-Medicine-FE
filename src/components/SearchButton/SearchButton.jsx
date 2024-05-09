import { Button } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import ButtonCom from "../../components/Button/ButtonCom.jsx";
import InputCom from "../../components/Input/InputCom.jsx"

const SearchButton = (props) => {
  const {
    size, placeholder, textbutton,
    bordered, backgroundColorInput = '#fff',
    backgroundColorButton = '#333333',
    colorButton = '#fff'
  } = props

  return (
    <div style={{ display: 'flex', }}>
      <InputCom
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonCom
        size={size}
        styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  )
}

export default SearchButton