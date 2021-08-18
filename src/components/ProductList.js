import React, { useEffect, useState } from 'react'

export const ProductList = ({ products }) => {

    const [itemList, setitemList] = useState([]);
    const [additem, setadditem] = useState(false);
    const [interval, setinterval] = useState(false)

    const [completed, setcompleted] = useState([]);
    const [uncompleted, setuncompleted] = useState([]);


    let myTimer;

    const handleAddProduct = (product) => {

        setitemList([...itemList, {
            id: product.id + itemList.length,
            name: product.name,
            thumbnail: product.thumbnail,
            preparation_time: product.preparation_time
        }]);

        setadditem(!additem);
    }

    const timer = () => {

        if (itemList.length > 0) {

            myTimer = setInterval(() => {

                let newItemList = [...itemList];
                newItemList.map((item, index) => {
                    if (item.preparation_time <= 0) {
                        newItemList[index].preparation_time = 0;
                    } else {
                        newItemList[index].preparation_time--
                    }
                });

                clearInterval(myTimer);
                setitemList(newItemList);
                setinterval(!interval);

            }, 1000);

        }
    }

    useEffect(() => {

        let newItemList = [...itemList];

        newItemList.map((item, index) => {
            if (item.preparation_time <= 0) {
                setcompleted([item])
                var index = newItemList.indexOf(item);
                if (index > -1) { 
                    newItemList.splice(index, 1);
                    console.log('REMOVED!')
                }
            }
        });

        setuncompleted(newItemList)

    }, [interval])

    useEffect(() => {
        setitemList(uncompleted);
        setadditem(!additem);

    }, [uncompleted])

    useEffect(() => {
        timer();
        return () => {
            clearInterval(myTimer);
        }
    }, [additem])

    return (
        <>
            <div className="v_machine">
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
                                    <button value={product} onClick={() => handleAddProduct(product)} className="btn">Seleccionar</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="products_queue">
                    <div className="screen">
                        {
                            itemList.map((item) => (
                                <li key={item.id}>{item.name} - <span className="time">{item.preparation_time}</span>s</li>
                            ))
                        }
                    </div>
                    <div className="completed">
                        {
                            completed.map((product, index) => (
                                <div key={index + product.id} className="completed__product">
                                    <div className="img">
                                        <img src={product.thumbnail} alt={product.name} />
                                    </div>
                                    <div className="product__name">
                                        {product.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
