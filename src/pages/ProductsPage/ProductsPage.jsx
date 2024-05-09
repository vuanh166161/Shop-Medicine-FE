import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonShowAll, WrapperProducts, WrapperTypeProduct } from "./ProductsPageStyle";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const ProductsPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [typeProducts, setTypeProducts] = useState([])
    const [limit, setLimit] = useState(6)
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit) 
        return res
    }


    const { data: products, isPreviousData } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000, keepPreviousData: true })

    const fetchAllType = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllType()
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ padding: '0 120px', margin: '0 auto', flex: "1 0 auto" }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
                <WrapperProducts>
                    {products?.data?.map((product) => {
                        return (
                            <CardComponent id={product._id} key={product._id} countInStock={product.countInStock} description={product.description} image={product.image}
                                name={product.name} price={product.price} rating={product.rating} type={product.type} discount={product.discount} selled={product.selled} />
                        )
                    })}
                </WrapperProducts>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperButtonShowAll textbutton="Show all" type="outline" styleButton={{
                        border: '1px solid #76b852', background: '#76b852', color: `${products?.total === products?.data?.length ? '#ccc' : 'black'}`, width: '240px', height: '38px', borderRadius: '4px'
                    }}
                        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                        styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                        onClick={() => setLimit((prev) => prev + 6)}
                    />
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}

export default ProductsPage;
