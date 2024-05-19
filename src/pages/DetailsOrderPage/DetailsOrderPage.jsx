import React, { useMemo } from 'react'
import { Spacer, WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import { convertPrice } from '../../utils'
import { useLocation, useParams } from 'react-router-dom'
import * as OrderService from "../../services/OrderService"
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import FooterComponent from '../../components/FooterComponent/FooterComponent'


const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params
  const fetchDetailsOrder = async () => {
    const res = await OrderService.getOrder(id, state?.token)
    return res.data
  }
  const queryOrder = useQuery({ queryKey: ["orders-details"], queryFn: fetchDetailsOrder, enabled: Boolean(id) })
  const { data } = queryOrder
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
   }, [data])
     
   return (
    <div style={{ width: '100%', background: '#f5f5fa' }}>
      <div style={{ width: '1270px', margin: '0 auto', height: '1270px' }}>
      <h3 style={{fontWeight: 'bold', marginTop:'10px', color: '#76b852', fontSize: '24px'}}>Order Details</h3>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel style={{fontWeight: 'bold'}}>Recipient Address</WrapperLabel>
            <WrapperContentInfo>
              <div className='name-info'><span style={{fontWeight: 'bold'}}>Name: </span> {data?.shippingAddress?.fullName}</div>
              <div className='address-info' style={{fontWeight: 'normal', marginTop:'8px'}}><span>Address: </span> {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}</div>
              <div className='phone-info'><span style={{fontWeight: 'normal', fontSize:'16px'}}>Phone: </span> {data?.shippingAddress?.phone}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel style={{fontWeight: 'bold'}}>Delivery Method</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className='name-delivery'>FAST </span>Economical delivery</div>
              <div className='delivery-fee'><span>Delivery Fee: </span> {data?.shippingPrice}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
            <WrapperLabel style={{fontWeight: 'bold'}}>Payment Method</WrapperLabel>
            <WrapperContentInfo>
              <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div>
              <div className='status-payment'>{data?.isPaid ? 'Paid' : 'Unpaid'}</div>
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <div style={{background:'#ccc', borderRadius:'4px'}}>
          <Spacer />
        <WrapperStyleContent>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '670px',fontWeight: 'bold' }}>Product</div>
            <WrapperItemLabel style={{fontWeight: 'bold'}}>Price</WrapperItemLabel>
            <WrapperItemLabel style={{fontWeight: 'bold'}}>Quantity</WrapperItemLabel>
            <WrapperItemLabel>Discount</WrapperItemLabel>
          </div>
        {data?.orderItems?.map((order) => {
          return (
            <WrapperProduct>
            <WrapperNameProduct>
              <img src={order?.image}
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  border: '1px solid rgb(238, 238, 238)',
                  padding: '2px'
                }}
              />
              <div style={{
                width: 260,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginLeft: '10px',
                height: '70px',
              }}>{order?.name}</div>
            </WrapperNameProduct>
            <WrapperItem style={{fontWeight: 'normal'}}>{convertPrice(order?.price)}</WrapperItem>
            <WrapperItem style={{fontWeight: 'normal'}}>{order?.amount}</WrapperItem>
            <WrapperItem style={{ color:'black',fontWeight: 'normal'}}>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
          </WrapperProduct>
          )
        })}
         <WrapperAllPrice>
            <WrapperItemLabel style={{fontWeight: 'bold'}}>Subtotal</WrapperItemLabel>
            <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel style={{fontWeight: 'bold'}}>Delivery Fee</WrapperItemLabel>
            <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
          </WrapperAllPrice>
          <WrapperAllPrice>
            <WrapperItemLabel style={{fontWeight: 'bold'}}>Total</WrapperItemLabel>
            <WrapperItem><WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem></WrapperItem>
          </WrapperAllPrice>
          <Spacer />
        </WrapperStyleContent>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default DetailsOrderPage