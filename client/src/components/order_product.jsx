import React from 'react'

function OrderProduct({product}) {

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:px-6 py-3">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className='flex flex-col items-center justify-center'>
                        <img className="h-[200px] w-[200px]" src={`/images/${product.picture}`} alt="image" />
                    </div>

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">${product.price.toLocaleString()} x {product.quantity}</p>
                        </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-start text-gray-900">{product.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderProduct