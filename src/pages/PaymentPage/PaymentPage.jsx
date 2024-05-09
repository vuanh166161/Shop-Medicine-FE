import { Checkbox, Form, Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomCheckbox, Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { InputValueNumber } from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import { useDispatch, useSelector } from 'react-redux';
import ModalCom from '../../components/ModalCom/ModalCom';
import ButtonCom from '../../components/Button/ButtonCom';
import InputCom from '../../components/Input/InputCom';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlice';
import { convertPrice } from '../../utils';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from "../../services/UserService"
import * as OrderService from "../../services/OrderService"
import * as PaymentService from "../../services/PaymentService"
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { updateUser } from '../../redux/slides/userSlice';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";



const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
  const [listChecked, setListChecked] = useState([])
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const [sdkReady, setSdkReady] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [valueUserDetails, setValueUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      return res
    }
  )

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const { token, ...rests } = data
      const res = OrderService.createOrder({ ...rests }, token)
      return res
    }
  )


  const handleDeleteAll = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }
  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemSelected && user?.name
      && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemSelected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: deliveryPriceMemo,
          totalPrice: totalPriceMeno,
          user: user?.id,
          email: user?.email
        }
      )

    }
  }

  const handleCancelUpdate = () => {
    setValueUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
      isSeller: false
    })
    form.resetFields()
    setIsOpenModalUpdateInfor(false)
  }
  const { data } = mutationUpdate
  const { data: dataAdd, isSuccess, isError } = mutationAddOrder


  const handleUpdateInfor = () => {
    const { name, address, phone, city } = valueUserDetails
    if (name && address && phone && city) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...valueUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({ name, address, phone, city }))
          setIsOpenModalUpdateInfor(false)
        }
      })
    }

  }
  const handleOnchangeUserDetails = (e) => {
    setValueUserDetails({
      ...valueUserDetails, [e.target.name]: e.target.value
    })
  }

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfor(true)
  }

  const handleDelivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      return total + (priceMemo * (totalDiscount * cur.amount) / 100)
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 100000) {
      return 15000
    } else if (priceMemo === 0) {
      return 0
    } else {
      return 10000
    }
  }, [priceMemo])

  const totalPriceMeno = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo])



  useEffect(() => {
    if (isOpenModalUpdateInfor) {
      setValueUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfor])

  useEffect(() => {
    form.setFieldsValue(valueUserDetails)
  }, [form, valueUserDetails])

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemSelected?.forEach(element => {
        arrayOrdered.push(element.product)
      })
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
      message.success('Order is successfully')
      navigate('/order-success', { state: { delivery, payment, orders: order?.orderItemSelected, totalPriceMeno: totalPriceMeno } })
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}&locale=en_US`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }
  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])

  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMeno,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
        email: user?.email
      }
    )
  }
  const exchangeRate = 0.00004;
  const totalPriceMenoUSD = totalPriceMeno * exchangeRate;
  return (
    <div style={{ width: 'auto', marginTop: '10px' }}>
      <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
        <div style={{ height: '100%', width: 'auto', margin: '0 auto' }}>
          <h3 style={{fontWeight: 'bold', marginLeft:'120px', marginTop:'10px', color: '#76b852', fontSize: '24px'}}>Payment methods</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức giao hàng</Lable>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span>Giao hàng tiết kiệm</Radio>
                    <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span>Giao hàng tiết kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="later_money">Thanh toán tiền mặt</Radio>
                    <Radio value="paypal">Paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: '100%' }}>
                <WrapperInfo style={{ width: 'auto' }}>
                  <div >
                    <span>Address: </span>
                    <span style={{ fontWeight: 'bold' }}>{`${user?.address}, ${user?.city}`}</span>
                    <span onClick={handleChangeAddress} style={{ color: '#5b8f3a', cursor: 'pointer' }}> Change</span>
                  </div>
                </WrapperInfo>
                <WrapperInfo style={{ width: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Tạm tính</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Giảm giá</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Phí giao hàng</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMeno)}</span>
                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === 'paypal' && sdkReady ? (
                <div style={{ width: '320px' }}>
                  <PayPalButton
                    amount={totalPriceMenoUSD}
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert('Payment Error')
                    }}
                  />
                </div>
              ) : (
                <ButtonCom
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButton={{
                    background: '#76b852',
                    height: '48px',
                    width: '320px',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                  textbutton={'Order'}
                  styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonCom>

              )}
            </WrapperRight>
          </div>
        </div>
        <ModalCom title="Update information" open={isOpenModalUpdateInfor} onCancel={handleCancelUpdate} onOk={handleUpdateInfor}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
              labelAlign="left"
            >
              <InputCom value={valueUserDetails['name']} onChange={handleOnchangeUserDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
              labelAlign="left"
            >
              <InputCom value={valueUserDetails.city} onChange={handleOnchangeUserDetails} name="city" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
              labelAlign="left"
            >
              <InputCom value={valueUserDetails.phone} onChange={handleOnchangeUserDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
              labelAlign="left"
            >
              <InputCom value={valueUserDetails.address} onChange={handleOnchangeUserDetails} name="address" />
            </Form.Item>
          </Form>
        </ModalCom>
      </div>
      <FooterComponent />
    </div>
  )
}

export default PaymentPage