import { Col, Image } from "antd"
import styled from "styled-components"
import { InputNumber } from "antd"

export const ImageSmallStyle = styled(Image)`
    height: 64px;
    width: 64px;
`
export const ColImageStyle = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const NameProductStyle = styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight:300;
    line-weight:32px;
    word-break: break-word;
    text-align: left;
`
export const TextSoldStyle = styled.span`
    font-size: 15px;
    line-height:24px;
    color: rgb(120, 120, 120);
`
export const PriceProductStyle = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;    
`
export const TextPriceProductStyle = styled.h1`
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;
    margin-right: 8px;
    padding: 10px;
    margin-top: 10px;
    color: black;
    text-align: left; 
`
export const AddressProduct = styled.div`
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsisl;
    },
    span.change-address{
        color: blue;
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }
`
export const QuantityProductStyle = styled.div`
display: flex;
gap: 4px;
align-items: center;
width: 200px;
border: 1px solid #ccc;
border-radius: 4px;
`

export const InputValueNumber = styled(InputNumber)`
   &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`