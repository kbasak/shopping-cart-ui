import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CheckOutCart, DeleteCart } from "../../util/APICalls";
import Header from "../home/Header";

import './Check.css';

function Check() {
    const [allcheck, setAllCheck] = useState();
    const [hasAgreed, setHasAgreed] = useState(false);
    //const [hasAgreedOne, setHasAgreedOne] = useState(false);
    const [selectedIds, setSelectedIds] = useState();

    const [productQuantity, setProductQuantity] = useState({});
    const navigate = useNavigate();
    const { state } = useLocation();
    const items = state.carts;
    console.log(items);

    useEffect(() => {
        async function checkout() {
            console.log("Inside UseEffect")
            console.log(Object.keys(productQuantity).length)
            if (Object.keys(productQuantity).length !== 0) {
                let ids = [];
                console.log("Inside UseEffect");
                for (const key in productQuantity) {
                    if (productQuantity.hasOwnProperty(key)) {
                        ids.push(productQuantity[key]);
                        console.log(`${key}: ${productQuantity[key]}`);
                    }
                }
                setSelectedIds(ids);
                console.log(ids);
            }
        }
        checkout();
    }, [productQuantity]);

    function handleChange(event, item) {
        let target = event.target;
        let name = target.name;
        if (name === "hasAgreed") {
            setHasAgreed(!hasAgreed);
            //const checkOutItem = items.filter(item => item.status === 'A')
            if (!hasAgreed) {
                setAllCheck(items);
                items.map(product => setProductQuantity((currentQuantity) => ({
                    ...currentQuantity,
                    [product.id]: product.id,
                })))
            } else {
                setAllCheck('');
            }
        }
    }

    async function handleCart(){
        const response=await CheckOutCart(selectedIds);
        console.log("Response: " + response);
        let formattedString = response.toString().split(",").join("\n");
        Swal.fire({
            position: "center",
            text: formattedString,
            icon: "success",
            width: '400px',
            background: '#12130f',
            color: 'white',
            allowEnterKey: false,
            confirmButtonText: "Shop Now",
        }).then(() => {
            navigate('/home');
        });
    }

    async function handleDelete(){
        const response=await DeleteCart(selectedIds);
        console.log("Response: " + response);
        let formattedString = response.toString().split(",").join(" || ");
        console.log(formattedString);
        Swal.fire({
            position: "center",
            text: formattedString,
            icon: "success",
            width: '400px',
            background: '#12130f',
            color: 'white',
            allowEnterKey: false,
            confirmButtonText: "Shop Now",
        }).then(() => {
            navigate('/home');
        });
    }

    // function handleChangeCheck(e, index) {

    //     setHasAgreedOne(!hasAgreedOne);
    //     if (!hasAgreedOne) {
    //         console.log(allcheck);
    //         console.log(item);
    //         setAllCheck(allcheck.filter(list => list.id !== item.id));
    //     }

    //     setProductQuantity((currentQuantity) => ({
    //         ...currentQuantity,
    //         [index]: e.target.value,
    //     }));
    // }

    function backToCart() {
        navigate('/cartpage');
    }
    return (
        <>
            <Header />
            <div className='delete-cart' key={Math.random()}>
                <button  onClick={handleDelete}>Delete</button>
            </div>
            <div className="mainSection">
                <div className="cardtemp">
                    <div className='tem'>
                        <div className="tem4">
                            <label className="selectCart">
                                {console.log(allcheck)}
                                {console.log(hasAgreed)}
                                {console.log(productQuantity)}
                                <input
                                    className="selectCartCheckbox"
                                    type="checkbox"
                                    name="hasAgreed"
                                    value={hasAgreed}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className='tem1' style={{width:'12.5%'}}>
                            SKU
                        </div>
                        <div className='tem2'>
                            Description
                        </div>
                        <div className='tem3'>
                            Quantity
                        </div>
                    </div>
                </div>
                {items.map((item, index) => {
                    return (
                        <>
                            {/* {(item.status === "A") && */}
                                <div className="cardtemp" style={{ marginBottom: '-10px' }} key={item.index}>
                                    <div className='tem'>
                                        {/* <div className="tem4">
                                            <label className="selectCart">
                                                <input
                                                    className="selectCartCheckbox"
                                                    type="checkbox"
                                                    name="hasAgreed-i"
                                                    value={hasAgreedOne}
                                                    onChange={(e) => handleChange(e, item.id)}

                                                />
                                            </label>
                                        </div> */}
                                        <div className='tem1'>
                                            {item.sku}
                                        </div>
                                        <div className='tem2'>
                                            {item.description}<br />
                                        </div>
                                        <div className='quant'>
                                            <input
                                                type="number"
                                                placeholder="QTY"
                                                min={0}
                                                value={item.quantity}
                                                name="quantity"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* } */}
                                </>
                    )
                })}
            </div>
            <div className='cart-checkout' style={{ marginTop: '10px', float: 'right' }}>
                <button onClick={backToCart}>Go To Shopping Cart</button>
                <button onClick={handleCart}>CheckOut</button>
            </div>
        </>
    );
}

export default Check;