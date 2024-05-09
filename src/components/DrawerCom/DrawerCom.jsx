import { Button, Drawer } from "antd";
import React from "react";

const DrawerCom = ({title='Drawer', placement='right', isOpen=false, children,...rests}) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerCom;
