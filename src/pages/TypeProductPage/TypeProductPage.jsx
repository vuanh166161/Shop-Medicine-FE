import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNav, WrapperProducts } from "./style";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from '../../services/ProductService'
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
    const {state} = useLocation()
    const [products, setProducts] = useState([])
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const navigate = useNavigate()
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1
    })
    const fetchProductType = async (type, page, limit) => {
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status == 'OK') {
            setProducts(res?.data)
            setPanigate({...panigate, total: res?.totalPage})
        }
    }


    useEffect(() => {
        if(state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    const onChange = (current, pageSize) => {
        setPanigate({...panigate, page: current -1, limit: pageSize})
     }
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ padding: '0 120px', background: '#efefef', flex: "1 0 auto" }}>
            <h5 style={{marginTop:'10px'}}><span style={{cursor:'pointer'}} onClick={() => {navigate('/products')}}>Product</span> > Types</h5>
                <div style={{ width: '100%', margin: '0 auto', height: '100%'}}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: '100%' }}>
                    <WrapperNav span={4}>
                        <NavbarComponent />
                    </WrapperNav>
                    <Col span={20} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <WrapperProducts >
                            {products?.filter((valueSearchProduct) => {
                                if(searchDebounce === '') {
                                    return valueSearchProduct
                                }else if(valueSearchProduct?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())){
                                    return valueSearchProduct
                                }
                            })?.map((product) => {
                                return (
                                    <CardComponent id={product._id} key={product._id} countInStock={product.countInStock} description={product.description} image={product.image}
                                name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} selled={product.selled} />
                                )
                            })}
                        </WrapperProducts>
                        <Pagination style={{ textAlign: 'center', marginTop: '10px' }} defaultCurrent={panigate?.page + 1} total={panigate.total} onChange={onChange} />
                    </Col>
                </Row>
                </div>
            </div>
            <FooterComponent />
        </div>
    );
};

export default TypeProductPage;
