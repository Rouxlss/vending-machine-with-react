import React from 'react'

export const ProductList = ({ products }) => {
    return (
        <>
            <div className="products">
                {
                    products.map((product) => (
                        <div key={product.id} className="product">
                            <div className="img">
                                <img src={product.thumbnail} alt={product.name} />
                            </div>
                            <div className="product__name">
                                {product.name}
                            </div>
                            <div className="select">
                                <button className="btn">Seleccionar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
