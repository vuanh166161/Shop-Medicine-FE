import React, { useEffect, useState } from "react";
import { LableText, TextContent, TextPrice, TextValue } from "./style";
import { Checkbox, Rate } from "antd";
import * as ProductService from '../../services/ProductService'
import TypeProduct from "../TypeProduct/TypeProduct";

const NavbarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])

    const fetchAllType = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllType()
    }, [])

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (<TextValue>{option}</TextValue>)
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onchange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                        <Checkbox value="A">B</Checkbox>
                    </Checkbox.Group>
                )
                case 'star':
                return options.map((option) => {
                    return (
                        <div style={{display:'flex', gap:'5px'}}>
                            <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
                            <span>{`From ${option} star`}</span>
                        </div>
                    )
                })
                case 'price':
                return options.map((option) => {
                    return (
                        <TextPrice>
                            {option}
                        </TextPrice>
                    )
                })
            default:
                return {}
        }
    }
    return (
        <div style={{background:'#ccc', padding:'4px'}}>
            <LableText>Types</LableText>
            <TextContent>
            {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
            </TextContent>
        </div>
    );
};

export default NavbarComponent;
