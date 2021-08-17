import React, { useEffect, useState } from 'react'
import { ProductList } from './ProductList'

export const Products = () => {

    const [products, setProducts] = useState(null);
    const [IsPending, setIsPending] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            fetch('https://vending-machine-test.vercel.app/api/products')
            .then(res => {
                return res.json()
            })
            .then((data)=>{
                setProducts(data.data)
                setIsPending(false);
            })
        }, 2000);
    }, [])

    return (
        <div>
            {IsPending && <div className="loader"><img src="./assets/loading.gif" alt="" /></div>}
            {products && <ProductList products={products}/>}
        </div>
    )
}
