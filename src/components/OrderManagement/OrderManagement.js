import { Upload } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
    text-align: left;
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
    & .ant-upload-list-item {
        display: none;
    }
`
export const List = styled.ul`
  list-style-type: none;
`;

export const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const colorIconCash = styled.span`
  color: rgb(0, 136, 254); /* Màu của biểu tượng */
  stroke: rgb(255, 255, 255);
`;
export const colorIconPaypal = styled.span`
  color: rgb(0, 169, 159); /* Màu của biểu tượng */
  stroke: rgb(255, 255, 255);
`;