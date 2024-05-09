import { Input } from "antd";
import { styled } from "styled-components";


export const WrapperInputStyle = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    background-color: rgb(232, 240, 254);
    outline: none;
    font-size: 0.9em; /* Thêm kích thước chữ */
    color: #333; /* Thêm màu chữ */
    font-weight: 100;
    width: 94.5%;
    display: block;
    border: none;
    padding: 0.8em;
    border: solid 1px rgba(255, 255, 255, 0.37);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background-position: -800px 0;
    background-size: 100%;
    background-repeat: no-repeat;
    font-family: 'Roboto', sans-serif;
`;
