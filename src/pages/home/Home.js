import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AddToCartStatus, LoadProductStatus } from '../../util/APICalls';
import Loading from '../loading/Loading';
import Header from './Header';
import './Home.css';
function Home({ OnLogout }) {

    const [items, setItem] = useState();
    const [loading, isLoading] = useState(true);

    const [productQuantity, setProductQuantity] = useState({});


    useEffect(() => {
        async function getProduct() {
            try {
                const response = await LoadProductStatus();
                console.log(response);
                setItem(response.listOfItems);
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
        getProduct();
    }, []);


    async function handleAddToCart(id, sku) {
        var quantity = productQuantity[id];
        console.log("Product Quantity: " + productQuantity[id]);
        console.log("Product id: " + id);
        console.log("Product sku: " + sku);
        try {
            const response = await AddToCartStatus(sku, parseInt(quantity));
            console.log(response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                text: "Item " + sku + " added to cart Successfully",
                showConfirmButton: false,
                timer: 2000,
                width: '300px',
                background: '#12130f',
                color: '#00ff00',
            });
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

    function handleChange(e, index) {
        setProductQuantity((currentQuantity) => ({
            ...currentQuantity,
            [index]: e.target.value,
        }));
    }

    return (
        <>
            <Header />
            {!loading &&
                <div className='mainDiv'>
                    {items.map((item, index) => {
                        return (
                            <div className='card' key={item.id}>
                                <div className='addtocart'>
                                    <div className='quantity'>
                                        <input
                                            type="number"
                                            placeholder="QTY"
                                            min={0}
                                            name="quantity"
                                            id={index}
                                            value={productQuantity[item.id]}
                                            onWheel={event => { event.preventDefault(); }}
                                            onChange={(e) => handleChange(e, item.id)} />
                                    </div>
                                    <div className='addtobasket'>
                                        <button onClick={handleAddToCart.bind(this, item.id, item.sku)}>Add To Basket</button>
                                    </div>
                                </div>
                                <div className='itemImage'>
                                    <img src={item.image} alt="logo" />
                                </div>
                                <div className='description'>
                                    <div className='product-title'>
                                        {item.description}
                                    </div>
                                    <div className='product-info'>
                                        <span style={{ color: 'red', fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`, }}>SKU: {item.sku}</span><br /><br />
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
                                                Store Deatil
                                            </div>
                                            <div className='v2' style={{ paddingRight: '3px' }}>
                                                QTY: {item.quantity}
                                            </div>
                                        </div>
                                        <div className='cost'>
                                            <span style={{ color: '#00098d' }}>Cost: ${item.cost}</span>
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
export default Home;