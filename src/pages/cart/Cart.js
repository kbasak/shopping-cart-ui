import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { GetCartDetails } from '../../util/APICalls';
import Loading from '../loading/Loading';
import Header from '../home/Header';
import '../home/Home.css';
import { useNavigate } from 'react-router-dom';
function Cart({ OnLogout }) {

    const [items, setItem] = useState();
    const [loading, isLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function getCart() {
            try {
                const response = await GetCartDetails();
                console.log(response);
                setItem(response);
                isLoading(false);
            } catch (exception) {
                if (!exception.response) {
                    // network error
                    Swal.fire({
                        position: "center",
                        title: "Network Error !!!",
                        icon: "error",
                        width: '300px',
                        background: '#12130f',
                        confirmButtonText: "Try Again",
                        color: 'white',
                        allowEnterKey: false,
                    })
                }
            }
        }
        getCart();
    }, []);

    function goToProduct(){
        navigate('/home');
    }

    function onCheckOut() {
        navigate('/checkout', { state: { carts: items } });
    }

    return (
        <>
            <Header onClick={OnLogout} />
            {!loading &&
                <div className='mainDiv'>
                    {items.length === 0 &&
                        <div class="nocart">
                            <div class="nocart-content">
                                <p class="nocart-title">Cart Empty!!!</p>
                                <div className='checkoutcart' >
                                    <button onClick={goToProduct}>Shop Now...</button>
                                </div>
                            </div>
                        </div>
                    }
                    {items.length >= 0 && items.map((item, index) => {
                        return (
                            <div className='cart-card' key={item.id}>
                                <div className='itemImage'>
                                    <img src={item.image} alt="logo" />
                                </div>
                                <div className='description'>
                                    <div className='product-title'>
                                        {item.description}
                                    </div>
                                    <div className='product-info'>
                                        <span style={{ color: 'red', fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`, }}>SKU: {item.sku}</span><br /><br />
                                        <span style={{ fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`, fontSize:'.8rem'}}>Cart Deatils:</span><br />
                                        <div className='v'>
                                            <div className='v1'>
                                                Vendor: {item.vendor}<br />
                                            </div>
                                            <div className='v2'>
                                                MFR: {item.mfr}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='store-detail'>
                                        <div className='qty'>
                                            <div className='v1'>
                                                Status: {item.status}
                                            </div>
                                            <div className='v2' style={{ paddingRight: '3px' }}>
                                                QTY: {item.quantity}
                                            </div>
                                        </div>
                                        <div className='cart-cost'>
                                            <span style={{ color: '#601010', lineHeight: 2.5 }}>Cost: ${item.cost}</span><br />
                                            <span style={{ color: '#a70000' }}>Total Cost: ${item.cost * item.quantity}</span>
                                            <div className='checkoutcart'>
                                                <button onClick={onCheckOut}>CheckOut</button>
                                            </div>
                                            {/* {item.status === 'C' &&
                                                <div className='checkoutcart'>
                                                    <button disabled={true} style={{ backgroundColor: '#bbddff', cursor: 'not-allowed', color: 'black' }} >CheckOut</button>
                                                </div>} */}
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        )
                    })}
                </div>
            }
            {loading && <Loading />}
        </>
    );
}
export default Cart;