import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent.jsx";
import FooterComponent from "../../components/FooterComponent/FooterComponent.jsx";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: "1 0 auto", padding: "15px 120px 0 120px", background: "#efefef" }}>
                <h5><span style={{ cursor: 'pointer' }} onClick={() => { navigate('/products') }}>Product</span> > Product Details</h5>
                <ProductDetailsComponent idProduct={id} />
            </div>
            <FooterComponent style={{ flex: "none" }} />
        </div>
    );
};

export default ProductDetailsPage;
