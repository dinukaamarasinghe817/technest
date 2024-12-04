import React, {useState, useEffect} from 'react'
import ProductCard from '../../components/product_card'
import instance from '../../services/axiosInstance';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const url = '/products';
    
            try {
                const response = await instance.get(url);
                setProducts(response.data);
                setLoading(false);
                console.log('Products fetched:', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <section className="bg-blue-50 py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                    </div>
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product, index) => <ProductCard key={index}  product={product}/>)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home