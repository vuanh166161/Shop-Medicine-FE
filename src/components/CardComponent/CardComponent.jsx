import React from "react";
import { CardStyle, DiscountText, PriceText, ReportText, StyleNameProduct, TextSoldStyle } from "./style";
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
    const {id, countInStock, description, image, name, price, rating, type, discount, selled} = props
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    const navigate = useNavigate()
    return (
        <CardStyle
            hoverable
            headStyle={{width: '200px', height: '200px'}}
            bodyStyle={{ padding: '10px' }}
            style={{ width: 200 }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
            >
            <StyleNameProduct>
                {name}
            </StyleNameProduct>
            <ReportText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating}</span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <TextSoldStyle>|  Sold {selled || 1000}+</TextSoldStyle>
            </ReportText>
            <PriceText>{convertPrice(price)}<DiscountText> -{discount || 5}%</DiscountText> </PriceText>
        </CardStyle>
    );
};

export default CardComponent;