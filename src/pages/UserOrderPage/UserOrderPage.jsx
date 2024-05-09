import React, { useEffect } from 'react'
import ButtonCom from '../../components/Button/ButtonCom';
import { convertPrice } from '../../utils';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from "../../services/OrderService"
import { useSelector } from 'react-redux';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from "../../components/MessageComponent/MessageComponent.jsx"



const UserOrderPage = () => {
  const location = useLocation()
  const {state} = location
  const navigate = useNavigate()
  const fetchUserOrder = async () => {
      const res = await OrderService.getDetailsOrder(state?.id, state?.token)
      return res.data
  } 
  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: fetchUserOrder , enabled: Boolean(state?.id && state?.token)})
  const { data } = queryOrder
  const handleDetailsOrder= (id) => {
    navigate(`/details-order/${id}`, {state: {token: state?.token}})
  }

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems} = data
    const res = OrderService.cancleOrder(id, token, orderItems)
    return res
  })

  const handleCancleOrder =(order) => {
    mutation.mutate({id: order?._id, token: state?.token, orderItems: order?.orderItems}, {
      onSuccess: () => {
        queryOrder.refetch()
      }
    })
  }
const {isSuccess: isSuccessCancle, isError: isErrorCancle, data: dataCancle} = mutation
  useEffect(() => {
    if(isSuccessCancle && dataCancle?.status === 'OK'){
      message.success()
    }else if(isErrorCancle){
      message.error()
    }
  },[isSuccessCancle,isErrorCancle])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}> 
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
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                marginLeft: '10px'
              }}>{order?.name}</div>
              <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
          })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <div style={{ width: 'auto', marginTop: '10px', flex: "1 0 auto" }}>
        <div>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3 style={{fontWeight: 'bold', marginTop:'10px', color: '#76b852', fontSize: '24px'}}>My Order</h3>
                    <WrapperListOrder>
                        {Array.isArray(data) && data.map((order) => {
                            return (
                                <WrapperItemOrder key={order?._id}>
                                    <WrapperStatus>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Status:</span>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}
                                        </div>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}

                                        </div>
                                    </WrapperStatus>
                                    {renderProduct(order?.orderItems)}
                                    <WrapperFooterItem>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonCom
                                                onClick={() => handleCancleOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Cancle Order'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonCom>
                                            <ButtonCom
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'See Deatails'}
                                                styleTextButton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonCom>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </div>
    </div>
    <FooterComponent />
</div>
  )
}

export default UserOrderPage