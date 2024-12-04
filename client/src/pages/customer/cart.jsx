import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import instance from '../../services/axiosInstance';
import CartProduct from '../../components/cart_product';
import OrderProduct from '../../components/order_product';

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState({ products: [] });
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!authService.isLoggedIn()) {
                navigate('/login');
                return;
            }

            const url = '/cart';
            try {
                const response = await instance.get(url);
                setCart(response.data);
                const total = response.data.products.reduce((sum, product) => {
                    return sum + product.quantity * product.price;
                }, 0);
            
                setTotal(total);
                setLoading(false);
                console.log('Cart fetched:', response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
            return;
        }
    
        fetchCart();
    }, []);

    useEffect(() => {
        const newTotal = cart.products.reduce((sum, product) => {
            return sum + product.quantity * product.price;
        }, 0);
        
        setTotal(newTotal);
    }, [cart.products]);

    const handleProceedToCheckout = () => {
        const placeOrder = async () => {
            if (!authService.isLoggedIn()) {
                navigate('/login');
                return;
            }

            const url = '/cart/checkout';
            try {
                const response = await instance.post(url);
                setOrderDetails(response.data);
                setIsModalOpen(true);
                console.log('Order Summary fetched:', response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setLoading(false);
            }
            return;
        }

        placeOrder();
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    const handleIncrement = async (id, index) => {
        if (!authService.isLoggedIn()) {
            navigate('/login');
            return;
        }

        const url = `/cart/products?product_id=${id}&action=increment`;
        try {
            const response = await instance.put(url);
            if (response.status === 200) {
                setCart((prevCart) => {
                    const updatedProducts = prevCart.products.map((product, i) => {
                        if (i === index) {
                            return {
                                ...product,
                                quantity: product.quantity + 1,
                            };
                        }
                        return product;
                    });
                    return { ...prevCart, products: updatedProducts };
                });
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
        return;
    }
    const handleDecrement = async (id, index) => {
        if (!authService.isLoggedIn()) {
            navigate('/login');
            return;
        }

        const url = `/cart/products?product_id=${id}&action=decrement`;
        try {
            const response = await instance.put(url);
            if (response.status === 200) {
                setCart((prevCart) => {
                    const updatedProducts = prevCart.products.map((product, i) => {
                        if (i === index) {
                            return {
                                ...product,
                                quantity: product.quantity - 1,
                            };
                        }
                        return product;
                    });
                    return { ...prevCart, products: updatedProducts };
                });
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
        return;
    }
    const handleOnChange = async (id, index, value) => {
        if (value < 1) {
            return;
        }
        if (!authService.isLoggedIn()) {
            navigate('/login');
            return;
        }

        const url = `/cart/products?product_id=${id}&action=assign&amount=${value}`;
        try {
            const response = await instance.put(url);
            if (response.status === 200) {
                setCart((prevCart) => {
                    const updatedProducts = prevCart.products.map((product, i) => {
                        if (i === index) {
                            return {
                                ...product,
                                quantity: value,
                            };
                        }
                        return product;
                    });
                    return { ...prevCart, products: updatedProducts };
                });
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
        return;
    }
    const handleDelete = async (id, index) => {
        if (!authService.isLoggedIn()) {
            navigate('/login');
            return;
        }

        const url = `/cart/products?product_id=${id}`;
        try {
            const response = await instance.delete(url);
            if (response.status === 200) {
                console.log('deleted');
                removeProduct(index);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
        return;
    }

    const removeProduct = (index) => {
        setCart((prevCart) => {
            const updatedProducts = [...prevCart.products];
            updatedProducts.splice(index, 1);
            return { ...prevCart, products: updatedProducts };
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className={`py-0 antialiased flex flex-col justify-start ${isModalOpen ? 'overflow-y-hidden' : ''}`}>
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex flex-col justify-start">
                <h2 className="text-xl font-semibold text-gray-900 text-center sm:text-2xl">Shopping Cart</h2>

                {cart.products.length === 0 ? (
                    <>
                        <h3 className='w-full text-center items-center justify-center'> You don't have any products in your cart </h3>
                    </>
                ) : (
                    <>

                    {isModalOpen && (
                        <div id="default-modal" tabindex="-1" class="absolute flex flex-col overflow-y-auto overflow-x-hidden top-[150px] backdrop-brightness-50 right-0 left-0 z-50 justify-start items-center w-screen md:inset-0 h-full max-h-full">
                            <div class="relative p-4 w-full max-w-2xl max-h-full">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700  mt-10">
                                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                            Order Details
                                        </h3>
                                        <button 
                                        onClick={handleCloseModal}
                                        type="button" className="text-red-500 bg-transparent hover:text-red-700 flex text-[12px] justify-center items-center rounded-full">
                                            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="p-4 md:p-5 space-y-2">
                                        <h3 className='w-full text-[20px] font-semibold text-start'>Order ID: <span className='text-blue-500'>{orderDetails.order_id}</span></h3>
                                        <h3 className='w-full text-[20px] font-semibold text-start'>Order Date: <span className='text-blue-500'>{orderDetails.placed_date}</span></h3>

                                        <h3 className='w-full text-[20px] font-semibold text-start'>Products</h3>
                                        <div className="mx-auto w-full flex flex-col lg:max-w-2xl xl:max-w-4xl gap-4">
                                            {orderDetails.products.map((product, index) => 
                                                <OrderProduct 
                                                product={product}
                                                />
                                                )}
                                        </div>
                                        <h3 className='w-full text-[20px] font-semibold text-start'>Total: <span className='text-blue-500'>${orderDetails.total_cost.toLocaleString()}</span></h3>
                                    </div>
                                    <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button 
                                        onClick={handleCloseModal}
                                        type="button" class="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`mt-6 sm:mt-8 md:gap-6 flex flex-row lg:flex-row gap-8 lg:items-start xl:gap-8`}>
                        <div className="mx-auto w-full flex flex-col lg:max-w-2xl xl:max-w-4xl gap-4">
                            {cart.products.map((product, index) => 
                            <CartProduct 
                            product={product}
                            handleIncrement={() => handleIncrement(product.id, index)} 
                            handleDecrement={() => handleDecrement(product.id, index)} 
                            handleOnChange={(id, amount) => handleOnChange(id, index, amount)}
                            handleDelete={() => handleDelete(product.id, index)}
                            />
                            )}
                        </div>

                        <div className=" mt-6 max-w-4xl ml-auto flex-1 space-y-6 lg:mt-0 lg:w-full">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <p className="text-xl font-semibold text-gray-900">Order summary</p>

                                <div className="space-y-4">
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-gray-900e">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${total.toLocaleString()}</dd>
                                    </dl>
                                </div>

                                <button 
                                onClick={handleProceedToCheckout}
                                className="flex w-full items-center justify-center cursor-pointer transition-all duration-200 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    Proceed to Checkout
                                </button>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500"> or </span>
                                    <a href="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Cart