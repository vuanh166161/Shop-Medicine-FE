import React, { useEffect, useState } from "react";
import { Row, Col, Image, Rate } from "antd";
import imageProduct from "../../assets/images/test.webp";
import imageProductSmall from "../../assets/images/test2.webp";
import { AddressProduct, ColImageStyle, ImageSmallStyle, InputValueNumber, NameProductStyle, PriceProductStyle, QuantityProductStyle, TextPriceProductStyle, TextSoldStyle } from "./ProductDetailsComponent";
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonCom from "../Button/ButtonCom";
import * as ProductService from "../../services/ProductService"
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlice";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";




const ProductDetailsComponent = ({ idProduct }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [ errorLimit,setErrorLimit] = useState(false)
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [quantityProduct, setQuantityProduct] = useState(1)
    const onChange = (value) => {
        setQuantityProduct(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    const { data: productDetails } = useQuery({ queryKey: ['product-details', idProduct], queryFn: fetchGetDetailsProduct, enabled: !!idProduct })

    const handleChangeCount = (type, limit) => {
        if (type === 'increase') {
            if(!limit) {
                setQuantityProduct(quantityProduct + 1)
            }
        } else {
            if(!limit){
                setQuantityProduct(quantityProduct - 1)
            }
        }
    }

    const handleAdd = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + quantityProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)){
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: quantityProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInStock: productDetails?.countInStock
                    }
                }))
            }else{
                setErrorLimit(true)
            }
        }
    }

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: quantityProduct,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock
                }
            }))
            navigate('/order')
        }
    }
    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Added to cart successfully')
        } 
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if((orderRedux?.amount + quantityProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)){
            setErrorLimit(false)
        }else if(productDetails?.countInStock === 0){
            setErrorLimit(true)
        }
    },[quantityProduct])

useEffect(() => {
    initFacebookSDK()
},[])

    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #ccc', paddingRight: '8px' }}>
                <Image src={productDetails?.image} alt="image product" preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                    <ColImageStyle span={4}>
                        <ImageSmallStyle src={imageProductSmall} alt="image small" preview={false} />
                    </ColImageStyle>
                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <NameProductStyle style={{ marginBottom: '10px' }}>{productDetails?.name}</NameProductStyle>
                <div>
                    <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                    <TextSoldStyle>|  Sold 999+</TextSoldStyle>
                </div>
                <PriceProductStyle>
                    <TextPriceProductStyle>{convertPrice(productDetails?.price)}</TextPriceProductStyle>
                </PriceProductStyle>
                <AddressProduct>
                    <span>Deliver to </span>
                    <span className="address">{user?.address}</span> -
                    <span className="change-address">Change address</span>
                </AddressProduct>
                <LikeButtonComponent dataHref= { process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/" : window.location.href}/>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                    <div style={{ marginBottom: '7px' }}>Quantity</div>
                    <QuantityProductStyle style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', quantityProduct === productDetails?.countInStock)}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <InputValueNumber size="small" defaultValue={1} onChange={onChange} value={quantityProduct} min={1} max={productDetails?.countInStock}/>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', quantityProduct === 1)}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </QuantityProductStyle>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                    <div>
                    <ButtonCom
                        size={40}
                        styleButton={{
                            background: '#76b852',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAdd}
                        textbutton={'Add'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonCom>
                        {errorLimit && <div style={{color: 'red'}}>Sold out</div>}
                        </div>
                    <ButtonCom
                        size={40}
                        styleButton={{
                            background: '#76b852',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAddOrderProduct}
                        textbutton={'Buy'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonCom>
                </div>
            </Col>
            <CommentComponent dataHref={ process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/comments#configurator" : window.location.href} width='1270'/>
        </Row>
    );
};

export default ProductDetailsComponent;
