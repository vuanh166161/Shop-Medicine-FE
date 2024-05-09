import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./UserManagement";
import { Button, Form, Space } from "antd";
import TableCom from "../TableCom/TableCom";
import InputCom from "../Input/InputCom";
import DrawerCom from "../DrawerCom/DrawerCom";
import * as message from "../../components/MessageComponent/MessageComponent.jsx"
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService"
import * as UserService from "../../services/UserService"
import { useQuery } from "@tanstack/react-query";
import {SearchOutlined} from "@ant-design/icons"
import { useSelector } from "react-redux";
import { getBase64 } from "../../utils";
import ModalCom from "../ModalCom/ModalCom";




const UserManagement = () => {
    const user = useSelector((state) => state?.user)
    const cancelButtonStyle = { backgroundColor: '#F5222D', borderColor: '#F5222D', color: 'white' };
    const okButtonStyle = { backgroundColor: '#76b852', borderColor: '#76b852', color: 'white' };
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const searchInput = useRef(null);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [valueUserDetails, setValueUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })
    

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests} = data
           const res = UserService.updateUser(id,{...rests}, token )
           return res
        }
    )  
    
    const mutationDelete = useMutationHooks(
        (data) => {
            const { id, token} = data
           const res = UserService.deleteUser(id, token)
           return res
        }
    )  

    const mutationDeleteMany= useMutationHooks(
        (data) => {
            const {token, ...IDs} = data
           const res = UserService.deleteManyUser(IDs, token)
           return res
        }
    )   

    const handleDeleteManyUser = (IDs) => {
        mutationDeleteMany.mutate({IDs: IDs, token: user?.access_token}, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

    const {data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const {data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDelete
    const {data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeleteMany



   
    
    useEffect(() => {
        if(isSuccessUpdated  && dataUpdated?.status === 'OK') {
            handleCloseDrawer()
            message.success()
        }else if(isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated])   

    useEffect(() => {
        if(isSuccessDeletedMany  && dataDeletedMany?.status === 'OK') {
            message.success()
        }else if(isErrorDeletedMany){
            message.error()
        }
    },[isSuccessDeletedMany])   

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
        setValueUserDetails({
            name: '',
        email: '',
        phone: '',
        isAdmin: false,
        })
        form.resetFields()
    };

    const [form] = Form.useForm()

    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token)
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
        form.setFieldsValue(valueUserDetails)
    }, [form, valueUserDetails])

    useEffect(() => {
        if(rowSelected && isOpenDrawer){
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if(res?.data){
            setValueUserDetails({
                name: res?.data?.name,
            email: res?.data?.email,
            phone: res?.data?.phone,
            isAdmin: res?.data?.isAdmin,
            address: res?.data.address,
            avatar: res?.data.avatar
            })
        }
        
    }

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const onUpdate = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...valueUserDetails}, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }

const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
}
const handleDelete = () => {
    mutationDelete.mutate({id: rowSelected, token: user?.access_token}, {
        onSettled: () => {
            queryUser.refetch()
        }
    })
}

    const queryUser = useQuery({queryKey:["user"], queryFn:getAllUser})
    const { data: users} = queryUser


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
          sorter: (a,b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a,b) => a.email.length - b.email.length,
              ...getColumnSearchProps('email')
          },
          {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                  text: 'True',
                  value: true,
                },
                {
                  text: 'False',
                  value: false,
                },
              ],
          },
          {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a,b) => a.phone - b.phone,
            ...getColumnSearchProps('phone'),
          },
          {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a,b) => a.address - b.address,
            ...getColumnSearchProps('address'),
          },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: setAction,
          },
      ];
      const dataTable = users?.data?.length && users?.data?.map((user) => {
        return {
            ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'
        }
      })

    const handleOnchangeUserDetails = (e) => {
        setValueUserDetails({
            ...valueUserDetails, [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj );
        }
        setValueUserDetails({
            ...valueUserDetails,
            avatar: file.preview
        })
    }
    return (
        <div>
            <WrapperHeader>User Management</WrapperHeader>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '60px', marginTop: '15px' }}>
                {/* <Button style={{ backgroundColor: '#76b852', color: 'white', border: 'none' }}>Export Excel</Button> */}
                <Button style={{ backgroundColor: '#76b852', color: 'white', border: 'none' }}>Add</Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableCom handleDeleteMany={handleDeleteManyUser} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }}/>
            </div>

            <DrawerCom title="User Details" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='40%'>
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
                        <InputCom  value={valueUserDetails['name']} onChange={handleOnchangeUserDetails} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueUserDetails['email']} onChange={handleOnchangeUserDetails} name="email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in phone!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueUserDetails.phone} onChange={handleOnchangeUserDetails} name="phone" />

                        

                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your count in address!',
                            },
                        ]}
                        labelAlign="left"
                    >
                        <InputCom value={valueUserDetails.address} onChange={handleOnchangeUserDetails} name="address" />

                        

                    </Form.Item>

                    <Form.Item
                        label="Avatar"
                        name="avatar"
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
                            {valueUserDetails?.avatar && (
                                    <img src={valueUserDetails?.image} style={{height: '60px',width: '60px', borderRadius: '50%', objectFit:'cover',marginLeft:'5px'}} alt="avatar"/>
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
            <ModalCom forceRender title="Delete" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDelete}
                cancelButtonProps={{ style: cancelButtonStyle }}  okButtonProps={{ style: okButtonStyle }}>
                <div>Are you sure?</div>
            </ModalCom>

        </div>
    )
}

export default UserManagement