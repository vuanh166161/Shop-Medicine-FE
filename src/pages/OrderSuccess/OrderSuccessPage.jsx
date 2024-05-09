import React, { useEffect, useMemo, useState } from 'react'
import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperContainer, WrapperValue, WrapperItemOrderInfo } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';



const OrderSuccessPage = () => {
  const order = useSelector((state) => state.order)
  const location = useLocation()
  const { state } = location
  return (
    <div style={{ width: 'auto', marginTop: '10px' }}>
      <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
        <div style={{ height: '100%', width: 'auto', margin: '0 auto' }}>
          <h3 style={{ fontWeight: 'bold', marginLeft: '120px' }}>Order placed successfully</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span>Giao hang tiet kiem
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder>
                      <div style={{ width: '700px', display: 'flex', alignItems: 'center', gap:'10px' }}>
                        <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                        <div style={{ width: 'auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Price: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Quantity: {order?.amount}</span>
                        </span>

                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <WrapperInfo>
                <span style={{ fontSize: '16px', color: 'red' }}>Total: {convertPrice(state?.totalPriceMeno)}</span>
              </WrapperInfo>
            </WrapperContainer>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default OrderSuccessPage