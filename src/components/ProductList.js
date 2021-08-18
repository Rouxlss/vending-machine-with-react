import React, { useEffect, useState } from 'react'

export const ProductList = ({ products, IsPending=null }) => {

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
        <main>

            <div className="v-machine">
                <div className="v-machine__inside">
                    <div className="shelf">
                        {
                            products.map((product, index) => (
                                <div key={product.id} className="item">
                                    <div className="img">
                                        <img
                                            src={product.thumbnail} alt={product.name} />
                                    </div>
                                    <div className="name">
                                        {index + 1 + "-" + product.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="output">
                        <div className="show-item">
                            {
                                completed.map((product) => (
                                    <div className="img">
                                        <img src={product.thumbnail} alt={product.name} />
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className="controls">
                    <div className="queue">
                        <ul>
                            {
                                itemList.map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </div>

            <div class="controls-use">
                <div class="queue">
                    <ul>
                        {
                            itemList.map((item) => (
                                <li key={item.id}>{item.name} - <span className="time">{item.preparation_time}</span>s</li>
                            ))
                        }
                    </ul>
                </div>
                <div class="buttons">
                    {
                        products.map((product, index) => (
                            <button value={product} onClick={() => handleAddProduct(product)} className="btn">{index + 1}</button>
                        ))
                    }
                </div>
            </div>


        </main>

       
    )
}
