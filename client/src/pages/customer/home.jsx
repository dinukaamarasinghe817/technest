import React from 'react'
import ProductModal from '../../models/product'
import ProductCard from '../../components/product_card'

const products = [

    new ProductModal(
        1,
        'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
        5.0,
        455,
        1699,
        '/images/imacmonitor.png'
    ),
    new ProductModal(
        2,
        'Apple iPhone 15 Pro Max, 256GB, Blue Titanium',
        4.9,
        1233,
        1199,
        '/images/iphone15promax.png'
    ),
    new ProductModal(
        3,
        'iPad Pro 13-Inch (M4): XDR Display, 512GB',
        4.9,
        879,
        799,
        '/images/ipadpro.png'
    ),
    new ProductModal(
        4,
        'PlayStation®5 Console – 1TB, PRO Controller',
        4.8,
        2957,
        499,
        '/images/ps5controller.png'
    ),
    new ProductModal(
        5,
        'Microsoft Xbox Series X 1TB Gaming Console',
        4.8,
        4263,
        499,
        '/images/xbox.png'
    ),
    new ProductModal(
        6,
        'Apple MacBook PRO Laptop with M2 chip',
        4.9,
        1076,
        2599,
        '/images/macbookpro.png'
    ),
    new ProductModal(
        7,
        'Apple Watch SE [GPS 40mm], Smartwatch',
        4.7,
        387,
        699,
        '/images/applewatch.png'
    ),
    new ProductModal(
        8,
        'Microsoft Surface Pro, Copilot+ PC, 13 Inch',
        4.9,
        4775,
        899,
        '/images/microsoftsurface.png'
    ),
]


function Home() {
  return (
    <div>
        <section class="bg-blue-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                </div>
                <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => <ProductCard  product={product}/>)}
                </div>
                <div class="w-full text-center">
                    <button type="button" class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Show more</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home