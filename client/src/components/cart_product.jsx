import React from 'react'

function CartProduct({product, handleIncrement, handleDecrement, handleOnChange, handleDelete}) {

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:px-6 py-3">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className='flex flex-col items-center justify-center'>
                        <img className="h-[200px] w-[200px]" src={`/images/${product.picture}`} alt="image" />
                    </div>

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                            <button 
                            onClick={handleDecrement}
                            type="button" id="decrement-button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-black border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                -
                            </button>
                            <input 
                            onChange={(e) => handleOnChange(product.id, e.target.value)}
                            value={product.quantity}
                            type="text" id="counter-input" className="w-20 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" required />
                            <button 
                            onClick={handleIncrement}
                            type="button" id="increment-button" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-black border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                +
                            </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">${product.price.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-start text-gray-900">{product.name}</p>

                        <div className="flex items-center gap-4">
                            <button 
                            onClick={handleDelete}
                            type="button" className="inline-flex items-center text-sm font-medium bg-red-100 text-red-600 border-none hover:bg-red-200 transition-all">
                                <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                </svg>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct