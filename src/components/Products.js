import React, { useEffect, useState } from 'react'
import { ProductList } from './ProductList'

export const Products = () => {

    const [products, setProducts] = useState(null);
    const [IsPending, setIsPending] = useState(true)
    const [IsError, setIsError] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            fetch('https://vending-machine-test.vercel.app/api/products')
            .then(res => {
                return res.json()
            })
            .then((data)=>{
                setProducts(data.data)
                setIsPending(false);
                setIsError(null);
            })
            .catch(err => {
                setIsError("Failed to fetch data");
                setIsPending(false);
            })
        }, 0);
    }, [])


    return (
        <>
            {IsError && <div className="error">{IsError}</div> }
            {IsPending && <div className="loader"><img src="./assets/loading.gif" alt="" /></div>}
            {products && <ProductList products={products}/>}
        </>
    )
}
