import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CheckOutCart, DeleteCart } from "../../util/APICalls";
import Header from "../home/Header";

import './Check.css';

function Check() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const items = state.carts;
    console.log(items);

    const [checkedState, setCheckedState] = useState(items.map(() => false));
    const [isAllChecked, setIsAllChecked] = useState(false);
    //const [selectedIds, setSelectedIds] = useState();

    const handleHeaderCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsAllChecked(checked);
        setCheckedState(checkedState.map(() => checked));
    };

    const handleRowCheckboxChange = (index) => {
        const updatedCheckedState = checkedState.map((item, idx) =>
            idx === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
        setIsAllChecked(updatedCheckedState.every((item) => item));
    };

    const handlePlaceOrder = async () => {
        const selectedProducts = items.filter((_, index) => checkedState[index]);
        console.log('Selected products for order:', selectedProducts);
        // You can send selectedProducts to your server or perform any other actions here
        const response=await CheckOutCart(selectedProducts);
        console.log(response);
        const TAndCList = response.toString().split(",").join("\n");
        // alert(TAndCList);
        Swal.fire({
            position: "center",
            html: '<pre>' + TAndCList + '</pre>',
            icon: "success",
            width: '400px',
            background: '#12130f',
            color: 'white',
            allowEnterKey: false,
            confirmButtonText: "Shop Now",
        }).then(() => {
            navigate('/cartpage');
        });
    };

    const handleDeleteCart = async () => {
        const selectedProducts = items.filter((_, index) => checkedState[index]);
        console.log('Selected products for Delete:', selectedProducts);
        // You can send selectedProducts to your server or perform any other actions here
        const response=await DeleteCart(selectedProducts);
        console.log(response);
        const TAndCList = response.toString().split(",").join("\n");
        // alert(TAndCList);
        Swal.fire({
            position: "center",
            html: '<pre>' + TAndCList + '</pre>',
            icon: "info",
            width: '400px',
            background: '#12130f',
            color: 'white',
            allowEnterKey: false,
            confirmButtonText: "Shop Now",
        }).then(() => {
            navigate('/home');
        });
    };

    function backToCart() {
        navigate('/cartpage');
    }
    return (
        <>
            <Header />
            <div className='delete-cart'>
                <button onClick={handleDeleteCart}>Delete</button>
            </div>
            <div className="mainSection">
                <div className="cardtemp">
                    <div className='tem'>
                        <div className="tem4">
                            <label className="selectCart">
                                <input
                                    className="selectCartCheckbox"
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={handleHeaderCheckboxChange}
                                />
                            </label>
                        </div>
                        <div className='tem1' style={{ width: '20%' }}>
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
                            <div className="cardtemp" style={{ marginBottom: '0px' }} key={item.index}>
                                <div className='tem'>
                                    <div className="tem4">
                                        <label className="selectCart">
                                            <input
                                                className="selectCartCheckbox"
                                                type="checkbox"
                                                checked={checkedState[index]}
                                                onChange={() => handleRowCheckboxChange(index)}
                                            />
                                        </label>
                                    </div>
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
                <button onClick={handlePlaceOrder}>CheckOut</button>
            </div>
        </>
    );
}

export default Check;