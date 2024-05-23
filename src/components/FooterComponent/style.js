import { Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled(Row)`
    padding: 20px 0;
    background-color: rgba(118, 184, 82, 1);
    flex-wrap: nowrap;
    width: 100%;
    justify-content: center;
    gap: 20px;
`;

export const WrapperTextFooter = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
`;

