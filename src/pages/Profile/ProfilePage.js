import { Upload } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    margin: 10px 0;
    text-align: center;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    margin-top: 10px;
    padding:  30px;
    border-radius: 3px;
    gap: 30px;
`
export const WrapperLable = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 100px;
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`