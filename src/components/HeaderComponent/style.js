import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgba(118, 184, 82, 1);
    flex-wrap: nowrap;
    width: 100%; /* Đảm bảo chiều dài của header bằng với màn hình */
`

export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 8px;
    font-size: 14px;
`
export const WrapperTextHeaderAcount = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;        
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: #76b852;
    }
`