
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import { useToast } from "@/hooks/use-toast";

// Sample products data
const products = [
  {
    id: '1',
    title: 'Calabrese Broccoli',
    description: 'Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c',
    category: 'Vegetable',
    price: 13.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '2',
    title: 'Fresh Banana Fruites',
    description: 'Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
    category: 'Fresh',
    price: 14.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '3',
    title: 'White Nuts',
    description: 'Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.',
    image: 'https://images.unsplash.com/photo-1544510807-78268e067c70',
    category: 'Millets',
    price: 15.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '4',
    title: 'Vegan Red Tomato',
    description: 'Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw.',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    category: 'Vegetable',
    price: 17.00,
    oldPrice: 20.00,
    rating: 5
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <div className="container mx-auto px-4 py-16">Product not found</div>;
  }
  
  const relatedProducts = products.filter(p => p.id !== id).slice(0, 4);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} added to your cart`,
    });
  };
  
  return (
    <>
      <Banner title="Shop Single" backgroundImage="https://images.unsplash.com/photo-1550989460-0adf9ea622e2" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="category-badge mb-4 inline-block">{product.category}</span>
              <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-primary mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-8">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-lg">${product.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                {product.description}
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-medium">Quantity :</span>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 bg-light flex items-center justify-center border border-gray-300 rounded-l-lg"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="w-16 h-10 text-center border-t border-b border-gray-300 outline-none"
                  />
                  <button 
                    className="w-10 h-10 bg-light flex items-center justify-center border border-gray-300 rounded-r-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="btn-primary flex-1 sm:flex-none"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <div className="flex border-b border-gray-300 mb-8">
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('description')}
              >
                Product Description
              </button>
              <button 
                className={`px-6 py-4 font-medium ${activeTab === 'additional' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                onClick={() => setActiveTab('additional')}
              >
                Additional Info
              </button>
            </div>
            
            <div>
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-600 mb-4">
                    Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition.
                  </p>
                  <p className="text-gray-600">
                    It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw and ripe fruits, respectively. It has nutritious value that help our body to growth.
                  </p>
                </div>
              )}
              
              {activeTab === 'additional' && (
                <div>
                  <p className="text-gray-600 mb-4">
                    <strong>Weight:</strong> 0.5 kg
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Origin:</strong> Local farms
                  </p>
                  <p className="text-gray-600">
                    <strong>Storage:</strong> Keep in a cool dry place away from direct sunlight.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default ProductDetail;
