import React, { useState } from "react";
import { Button, Divider, Dropdown, Radio, Space, Table } from 'antd';

const TableCom = (props) => {
    const {selectionType = 'checkbox', data=[], columns=[], handleDeleteMany} = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKeys(selectedRowKeys)
        }
        // ,
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
const handleDeleteAll = () => {
  handleDeleteMany(rowSelectedKeys)
}
      
    return (
       <>
       {rowSelectedKeys.length > 0 && (
        <Button style={{background: '#76b852', color:'white', cursor:'pointer', padding:'4px 15px', borderRadius:'4px'}} onClick={handleDeleteAll}>
        Delete all
       </Button>
       )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
</>
    )
}

export default TableCom