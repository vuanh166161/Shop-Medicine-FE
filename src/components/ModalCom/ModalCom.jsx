import { Modal } from "antd";
import React from "react";

const ModalCom = ({title='modal', isOpen=false, children, ...rests}) => {
    return (

        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>

    )
}

export default ModalCom