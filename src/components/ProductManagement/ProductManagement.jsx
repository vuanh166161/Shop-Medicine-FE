import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./ProductManagement";
import { Button, Form, Modal, Select, Space } from "antd";
import TableCom from "../TableCom/TableCom";
import InputCom from "../Input/InputCom.jsx";
import { WrapperUploadFile } from "./ProductManagement";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService"
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { useQuery } from "@tanstack/react-query";
import DrawerCom from "../DrawerCom/DrawerCom";
import { useSelector } from "react-redux";
import ModalCom from "../ModalCom/ModalCom";
import {SearchOutlined} from "@ant-design/icons"


const ProductManagement = () => {
    // const okButtonStyle = { backgroundColor: '#76b852', borderColor: '#76b852', color: 'white' };
    const user = useSelector((state) => state?.user)
    const cancelButtonStyle = { backgroundColor: '#F5222D', borderColor: '#F5222D', color: 'white' };
    const okButtonStyle = { backgroundColor: '#76b852', borderColor: '#76b852', color: 'white' };
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')
  const searchInput = useRef(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    
    const inittial = () => ({
        name: '',
        type: '',
        description: '',
        price: '',
        countInStock: '',
        rating: '',
        image: '',
        newType: '',
        discount: ''
    })
    const [valueProduct, setValueProduct] = useState(inittial())
    const [valueProductDetails, setValueProductDetails] = useState(inittial())
    const mutation = useMutationHooks(
        (data) => {
            const { name, type, description, price, countInStock, rating, image, discount} = data
           const res = ProductService.createProduct({name, type, description, price, countInStock, rating, image, discount})
           return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests} = data
           const res = ProductService.updateProduct(id, token, {...rests})
           return res
        }
    )  
    
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token} = data
           const res = ProductService.deleteProduct(id, token)
           return res
        }
    )
    const mutationDeleteMany= useMutationHooks(
        (data) => {
            const {token, ...IDs} = data
           const res = ProductService.deleteManyProduct(IDs, token)
           return res
        }
    )   

    const {data, isSuccess, isError} = mutation
    const {data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const {data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDelete
    const {data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeleteMany


    useEffect(() => {
        if(isSuccess && data?.status === 'OK') {
            handleCancel()
            message.success()
        }else if(isError){
            message.error()
        }
    },[isSuccess])   

    useEffect(() => {
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        }else if(isErrorDeletedMany){
            message.error()
        }
    },[isSuccessDeletedMany])   
    
    useEffect(() => {
        if(isSuccessUpdated  && dataUpdated?.status === 'OK') {
            handleCloseDrawer()
            message.success()
        }else if(isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated])   

    useEffect(() => {
        if(isSuccessDeleted && dataDeleted?.status === 'OK') {
            handleCancelDelete()
            message.success()
        }else if(isErrorDeleted){
            message.error()
        }
    },[isSuccessDeleted])   

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setValueProductDetails({
            name: '',
        type: '',
        description: '',
        price: '',
        countInStock: '',
        rating: '',
        image: ''
        })
        form.resetFields()
    };

    const [form] = Form.useForm()

    const handleCancel = () => {
        setIsModalOpen(false);
        setValueProduct({
            name: '',
        type: '',
        description: '',
        price: '',
        countInStock: '',
        rating: '',
        image: '',
        discount: ''
        })
        form.resetFields()
    };
    const getAllProduct = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const setAction = () => {
        return (
            <div style={{color: 'blue', cursor:'pointer'}}> 
            <span onClick={() => setIsModalOpenDelete(true)}>Delete</span>
            <span style={{marginLeft:'10px'}} onClick={handleDetailsProduct}>Edit</span>
            </div>
        )
    }
    useEffect(() => {
        if(!isModalOpen) {
            form.setFieldsValue(valueProductDetails)
        }else{
            form.setFieldsValue(inittial())
        }
    }, [form, valueProductDetails, isModalOpen])

    useEffect(() => {
        if(rowSelected && isOpenDrawer){
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if(res?.data){
            setValueProductDetails({
                name: res?.data?.name,
            type: res?.data?.type,
            description: res?.data?.description,
            price: res?.data?.price,
            countInStock: res?.data?.countInStock,
            rating: res?.data?.rating,
            image: res?.data?.image,
            discount: res?.data?.discount
            })
        }
        
    }

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const onUpdate = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...valueProductDetails}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
}
const handleDelete = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
        onSettled: () => {
            queryProduct.refetch()
        }
    })
}
const fetchAllType = async () => {
    const res = await ProductService.getAllTypeProduct()
    return res
}

    const queryProduct = useQuery({queryKey:["products"], queryFn:getAllProduct})
    const typeProduct = useQuery({queryKey:["type-product"], queryFn:fetchAllType})
    const { data: products} = queryProduct
    
    const handleDeleteManyProduct = (IDs) => {
        mutationDeleteMany.mutate({IDs: IDs, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex
      ) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
            <InputCom
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={`${selectedKeys[0] || ''}`}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                size="small"
                style={{ width: 90,backgroundColor: '#76b852', borderColor: '#76b852', color: 'white' }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90, backgroundColor: '#1890ff', borderColor: '#1890ff', color: 'white' }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                style={{backgroundColor: '#F5222D', borderColor: '#F5222D', color: 'white'}}
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: text =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
      });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
          sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
          title: 'Type',
          dataIndex: 'type',
          ...getColumnSearchProps('type')
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a,b) => a.rating - b.rating,
          filters: [
              {
                text: 'Over 3',
                value: '>=',
              },
              {
                text: 'Under 3',
                value: '<=',
              },
            ],
            onFilter: (value, record) => {
              if(value === '>='){
                  return record.rating >= 3
              } 
              return record.rating <= 3
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a,b) => a.price - b.price,
            filters: [
                {
                  text: 'Over 300000',
                  value: '>=',
                },
                {
                  text: 'Under 300000',
                  value: '<=',
                },
              ],
              onFilter: (value, record) => {
                if(value === '>='){
                    return record.price >= 300000
                } 
                return record.price <= 300000
              },
          },
        {
          title: 'Description',
          dataIndex: 'description',
        },
        {
            title: 'Count',
            dataIndex: 'countInStock',
          },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: setAction,
          },
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {
            ...product, key: product._id
        }
      })
    const onFinish = () => {
        const params = {
            name: valueProduct.name,
            type: valueProduct.type === 'new_type' ? valueProduct.newType : valueProduct.type,
            description: valueProduct.description,
            price: valueProduct.price,
            countInStock: valueProduct.countInStock,
            rating: valueProduct.rating,
            image: valueProduct.image,
            discount: valueProduct.discount
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleOnchange = (e) => {
        setValueProduct({
            ...valueProduct, [e.target.name]: e.target.value
        })
    }
    const handleOnchangeProductDetails = (e) => {
        setValueProductDetails({
            ...valueProductDetails, [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setValueProduct({
            ...valueProduct,
            image: file.preview
        })
    }
    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setValueProductDetails({
            ...valueProductDetails,
            image: file.preview
        })
    }

    const handleChangeSelect = (value) => {
            setValueProduct({
                ...valueProduct,
                type: value
            })
    }

    return (
        <div>
            <WrapperHeader>Product Management</WrapperHeader>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '60px', marginTop: '15px' }}>
                {/* <Button style={{ backgroundColor: '#76b852', color: 'white', border: 'none' }}>Export Excel</Button> */}
                <Button style={{ backgroundColor: '#76b852', color: 'white', border: 'none' }} onClick={() => setIsModalOpen(true)}>Add</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableCom handleDeleteMany={handleDeleteManyProduct} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }}/>
            </div>
            <ModalCom forceRender title="Add product" open={isModalOpen} onCancel={handleCancel} footer={null}
                cancelButtonProps={{ style: cancelButtonStyle }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom  value={valueProduct['name']} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]} 
              labelAlign="left"
            >
                
              <Select
                name="type"
                value={valueProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
                />
            </Form.Item>
            {valueProduct.type === 'new_type' && (
              <Form.Item
                label='New type'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
                labelAlign="left"
              >
                <InputCom value={valueProduct.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your countInStock!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProduct.price} onChange={handleOnchange} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in stock!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProduct.rating} onChange={handleOnchange} name="rating" />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your discount!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProduct.discount} onChange={handleOnchange} name="discount" />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button >Select File</Button>
                            {valueProduct?.image && (
                                    <img src={valueProduct?.image} style={{height: '60px',width: '60px', borderRadius: '50%', objectFit:'cover',marginLeft:'5px'}} alt="avatar"/>
                                )}
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#76b852', borderColor: '#76b852' }}>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </ModalCom>
            <DrawerCom title="Product Details" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
            <Form 
                    form={form}
                    name="drawer"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 19,
                    }}
                    onFinish={onUpdate}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom  value={valueProductDetails['name']} onChange={handleOnchangeProductDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your type!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails['type']} onChange={handleOnchangeProductDetails} name="type" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails.description} onChange={handleOnchangeProductDetails} name="description" />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your countInStock!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails.price} onChange={handleOnchangeProductDetails} name="price" />
                    </Form.Item>
                    <Form.Item
                        label="CountInStock"
                        name="countInStock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in stock!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails.countInStock} onChange={handleOnchangeProductDetails} name="countInStock" />
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your rating!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails.rating} onChange={handleOnchangeProductDetails} name="rating" />
                        
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your discount!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueProductDetails.discount} onChange={handleOnchangeProductDetails} name="discount" />
                        
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button >Select File</Button>
                            {valueProductDetails?.image && (
                                    <img src={valueProductDetails?.image} style={{height: '60px',width: '60px', borderRadius: '50%', objectFit:'cover',marginLeft:'5px'}} alt="avatar"/>
                                )}
                        </WrapperUploadFile>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 18,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#76b852', borderColor: '#76b852' }}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </DrawerCom>
            <ModalCom title="Delete" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDelete}
                cancelButtonProps={{ style: cancelButtonStyle }}  okButtonProps={{ style: okButtonStyle }}>
                <div>Are you sure?</div>
            </ModalCom>
        </div>
    )
}

export default ProductManagement
