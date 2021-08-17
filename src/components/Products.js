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


echo "# vending-machine-with-react" >> README.md
git init
git add README.md
git add .
git commit -m "getting data from api and styled components done"
git branch -M master
git branch -M dev
git remote add origin https://github.com/Rouxlss/vending-machine-with-react.git
git push -u origin dev