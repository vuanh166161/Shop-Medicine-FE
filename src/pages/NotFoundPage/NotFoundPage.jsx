import React from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { Image } from "antd";
import notFoundImage from '../../assets/images/404NotFound.webp';
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const NotFoundPage = () => {
    return (
        <div>
            <HeaderComponent />
            <div style={{ textAlign: 'center' }}>
                <Image
                    preview={false}
                    width="100%" // Đặt kích thước chiều rộng của ảnh bằng 100% của màn hình
                    src={notFoundImage}
                    style={{ display: 'inline-block' }}
                />
            </div>
            <FooterComponent />
        </div>
    )
}

export default NotFoundPage;
