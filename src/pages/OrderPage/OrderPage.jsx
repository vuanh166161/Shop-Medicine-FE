import {Checkbox, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperStyleHeaderStatus, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
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
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { updateUser } from '../../redux/slides/userSlice';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';



const OrderPage = () => {
const order = useSelector((state) => state.order)
const user = useSelector((state) => state.user)
const [isOpenModalUpdateInfor, setIsOpenModalUpdateInfor] = useState(false)
const [listChecked, setListChecked] = useState([])
const dispatch = useDispatch()
const [currentStep, setCurrentStep] = useState(0);
const navigate = useNavigate()
const [form] = Form.useForm()
const [valueUserDetails, setValueUserDetails] = useState({
  name: '',
  phone: '',
  address: '',
  city: ''
})
const mutationUpdate = useMutationHooks(
  (data) => {
      const { id, token, ...rests} = data
     const res = UserService.updateUser(id,{...rests}, token )
     return res
  }
)  

 const onChange = (e) => {
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    }else{
      setListChecked([...listChecked, e.target.value])
    }
 }
 const handleChangeCount = (type, idProduct, limit) => {
    if(type=== 'increase'){
      if(!limit){
        dispatch(increaseAmount({idProduct}))
      }
    }else{
      if(!limit) {
        dispatch(decreaseAmount({idProduct}))
      }
    }
 }

 const handleDelete = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))
 }

 const handleOnchangeCheckAll = (e) => {
  if(e.target.checked){
    const newListChecked = []
    order?.orderItems?.forEach((item) => {
      newListChecked.push(item?.product)
    })
    setListChecked(newListChecked)
  }else{
    setListChecked([])
  }
 }

 const handleDeleteAll = () => {
  if(listChecked?.length > 1){
    dispatch(removeAllOrderProduct({listChecked}))
  }
 }
 const handleAddCard = () => {
   if(!order?.orderItemSelected?.length){
      message.error('Oops, please select a product!')
    } else if(!user?.phone || !user?.address || !user?.name || !user?.city){
      setIsOpenModalUpdateInfor(true)
    }else{
      navigate('/payment')
    }
 }
 const handleCancelUpdate = () => {
        setValueUserDetails({
            name: '',
        email: '',
        phone: '',
        isAdmin: false,
        isSeller: false,
        })
        form.resetFields()
  setIsOpenModalUpdateInfor(false)
 }
 const {data} = mutationUpdate

 
 const handleUpdateInfor = () => {
  const {name, address, phone, city} = valueUserDetails
  if(name && address && phone && city){
    mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...valueUserDetails}, {
      onSuccess: () => {
        dispatch(updateUser({ name, address, phone, city}))
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

const priceMemo = useMemo(() => {
  return order?.orderItemSelected?.reduce((total, cur) => {
    if (listChecked.includes(cur.product)) {
      return total + cur.price * cur.amount; // Chỉ tính tổng tiền của sản phẩm đã chọn
    }
    return total; // Không cộng thêm nếu sản phẩm chưa được chọn
  }, 0);
}, [order, listChecked]);

const priceDiscountMemo = useMemo(() => {
  return order?.orderItemSelected?.reduce((total, cur) => {
    if (listChecked.includes(cur.product)) {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (cur.price * (totalDiscount * cur.amount) / 100); // Tính giảm giá của sản phẩm đã chọn
    }
    return total; // Không cộng thêm nếu sản phẩm chưa được chọn
  }, 0);
}, [order, listChecked]);

const deliveryPriceMemo = useMemo(() => {
  if (priceMemo > 500000 || order?.orderItemSelected?.length === 0) {
    return 0; // Free shipping for orders over 500,000 VND or if there are no items selected
  } else if (priceMemo >= 200000) {
    return 10000; // Shipping fee is 10,000 VND for orders from 200,000 VND to 499,999 VND
  } else {
    return 20000; // Shipping fee is 20,000 VND for orders below 200,000 VND
  }
}, [priceMemo, order?.orderItemSelected?.length]);

const totalPriceMeno = useMemo(() => {
  return priceMemo - priceDiscountMemo + deliveryPriceMemo; 
}, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

 useEffect(() => {
  dispatch(selectedOrder({listChecked}))
 }, [listChecked])

 useEffect(() => {
  if(isOpenModalUpdateInfor){
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
  let newCurrentStep;
  if (priceMemo > 500000) {
    newCurrentStep = 2; // Free
  } else if (priceMemo >= 200000) {
    newCurrentStep = 1; // 10.000 VND
  } else {
    newCurrentStep = 0; // 20.000 VND
  }
  setCurrentStep(newCurrentStep);
}, [priceMemo]);

const itemsDelivery = [
  {
    title: '20.000 VND',
    description: 'Under 200.000 VND',
  },
  {
    title: '10.000 VND',
    description: 'From 200.000 VND to 499.999 VND', // Thay đổi mô tả cho phù hợp
  },
  {
    title: 'Free', // Thay đổi title thành "Free" để rõ ràng hơn
    description: 'Over 500.000 VND', // Thay đổi mô tả cho phù hợp
  }
];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
    <div style={{background: '#f5f5fa', width: '100%', flex: "1 0 auto"}}>
      <div style={{margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold', marginLeft:'120px', marginTop:'10px', color: '#76b852', fontSize: '24px'}}>Cart</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperLeft>
            <WrapperStyleHeaderStatus>
<StepComponent items={itemsDelivery} current={currentStep} key={currentStep} />
            </WrapperStyleHeaderStatus>
            <WrapperStyleHeader>
                <span style={{display: 'inline-block', width: '390px'}}>
                  <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                  <span> All ({order?.orderItems?.length} item)</span>
                </span>
                <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Unit price</span>
                  <span>Quantity</span>
                  <span>Subtotal</span>
                  <DeleteOutlined onClick={handleDeleteAll} style={{cursor: 'pointer'}}/>
                </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                  <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                  <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                  <div style={{width:'auto', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{order?.name}</div>
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>
                    <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                  </span>
                  <WrapperCountOrder style={{ display: 'flex', justifyContent:'space-between', with:'auto'}}>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease',order?.product, order?.amount === 1 )}>
                        <MinusOutlined style={{ color: '#000', fontSize: '7px' }}/>
                    </button>
                    <InputValueNumber  defaultValue={order?.amount} value={order?.amount} size="small"  min={1} max={order?.countInStock}/>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase',order?.product, order?.amount === order?.countInStock)}>
                        <PlusOutlined style={{ color: '#000', fontSize: '7px' }}/>
                    </button>
                  </WrapperCountOrder>
                  <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{convertPrice(order?.price * order?.amount)}</span>
                  <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDelete(order?.product)}/>
                </div>
              </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{width: '100%'}}>
              <WrapperInfo style={{width:'auto'}}>
                <div >
                  <span>Address: </span>
                  <span style={{fontWeight: 'bold'}}>{`${user?.address}, ${user?.city}`}</span>
                  <span  onClick={handleChangeAddress} style={{color: '#5b8f3a', cursor:'pointer'}}> Change</span>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{width:'auto'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Subtotal</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Discount</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Shipping fee</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Total amount</span>
                <span style={{display:'flex', flexDirection: 'column'}}>
                  <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMeno)}</span>
                  <span style={{color: '#000', fontSize: '11px'}}>(Including VAT if applicable)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonCom
              onClick={() => handleAddCard()}
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
          </WrapperRight>
        </div>
      </div>
      <ModalCom title="Update information"  open={isOpenModalUpdateInfor} onCancel={handleCancelUpdate} onOk={handleUpdateInfor}>
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
              <InputCom value={valueUserDetails.city} onChange={handleOnchangeUserDetails}  name="city" />
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
              <InputCom value={valueUserDetails.address} onChange={handleOnchangeUserDetails}  name="address" />
            </Form.Item>
          </Form>
      </ModalCom>
    </div>
    <FooterComponent />
    </div>
  )
}

export default OrderPage