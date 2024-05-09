import { Spin } from 'antd'
import React from 'react'

const LoadingComponent = ({ children, isPending, deday = 200 }) => {
    return (
        <Spin spinning={isPending} delay={deday}>
            {children}
        </Spin>
    )
}

export default LoadingComponent