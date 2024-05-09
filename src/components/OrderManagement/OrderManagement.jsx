import React, { useEffect, useRef, useState } from "react";
import { Icon, List, ListItem, WrapperHeader, WrapperUploadFile } from "./OrderManagement";
import { Button, Form, Space } from "antd";
import TableCom from "../TableCom/TableCom";
import InputCom from "../Input/InputCom";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux";
import { convertPrice, getBase64 } from "../../utils";
import * as OrderService from "../../services/OrderService"
import { orderContant } from "../../contant";
import ChartPayment from "./ChartPayment";
import { PieChartTwoTone } from '@ant-design/icons'




const OrderManagement = () => {
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder })
    const { data: orders } = queryOrder

    const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex
    ) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
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
                        style={{ width: 90, backgroundColor: '#76b852', borderColor: '#76b852', color: 'white' }}
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
                        style={{ backgroundColor: '#F5222D', borderColor: '#F5222D', color: 'white' }}
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
        onFilter: (value, record) => {
            if (dataIndex === 'orderItems.name') {
                // Kiểm tra xem record[dataIndex] và item.name có tồn tại không trước khi thực hiện thao tác
                return record.orderItems && record.orderItems.some(item => item.name && item.name.toString().toLowerCase().includes(value.toLowerCase()));
            } else {
                // Kiểm tra xem record[dataIndex] có tồn tại không trước khi thực hiện thao tác
                return record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
            }
        },
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

    });

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Product Name',
            dataIndex: 'orderItems',
            render: (orderItems) => (
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            ),
            sorter: (a, b) => {
                const nameA = a.orderItems.map(item => item.name).join('');
                const nameB = b.orderItems.map(item => item.name).join('');
                return nameA.localeCompare(nameB);
            },
            ...getColumnSearchProps('orderItems.name')
        },
        {
            title: 'Amount',
            dataIndex: 'orderItems',
            render: (orderItems) => (
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>
                            {item.amount}
                        </li>
                    ))}
                </ul>
            ),
            sorter: (a, b) => {
                const amountA = a.orderItems.reduce((acc, curr) => acc + curr.amount, 0);
                const amountB = b.orderItems.reduce((acc, curr) => acc + curr.amount, 0);
                return amountA - amountB;
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address - b.address,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Payment',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod - b.paymentMethod,
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            ...getColumnSearchProps('totalPrice'),
        },

    ];

    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log('user', order)
        return {
            ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address,
            paymentMethod: orderContant.payment[order?.paymentMethod], isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
            totalPrice: convertPrice(order?.totalPrice), orderItems: order.orderItems
        }
    })

    return (
        <div>
            <WrapperHeader>Order Management</WrapperHeader>
            <div style={{ height: '200px', width: '200px' }}>
                <ChartPayment data={orders?.data} />
            </div>
            <div style={{ width: '200px', display: 'flex', flexDirection: 'column', marginLeft: '25px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div><PieChartTwoTone /> Chart Payment:</div>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop:'10px' }}>
    <div>🔵 Cash</div>
    <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(0, 136, 254)', marginLeft: '23px' }}></div>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginTop:'10px' }}>
    <div>🔵 Paypal</div>
    <div style={{ width: '20px', height: '20px', backgroundColor: 'rgb(0, 196, 159)', marginLeft: '11px' }}></div>
  </div>
</div>
            <div style={{ marginTop: '20px' }}>
                <TableCom columns={columns} data={dataTable} />
            </div>
        </div>
    )
}

export default OrderManagement