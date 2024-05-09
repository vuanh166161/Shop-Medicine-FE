import { Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled(Row)`
    padding: 20px 0; /* Loại bỏ padding 120px ở cả hai phía */
    background-color: rgba(118, 184, 82, 1);
    flex-wrap: nowrap;
    width: 100%;
    justify-content: center; /* Canh giữa các phần tử */
    gap: 20px; /* Khoảng cách giữa các phần tử */
`;

export const WrapperTextFooter = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    flex-grow: 1; /* Đặt các phần tử có cùng độ rộng */
`;

