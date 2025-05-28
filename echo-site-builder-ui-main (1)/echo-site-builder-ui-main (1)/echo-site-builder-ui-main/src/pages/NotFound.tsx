
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const NotFound = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Check if this is a product page
  const isProductPage = location.pathname.startsWith('/products/');
  const productId = isProductPage ? location.pathname.split('/').pop() : null;
  
  // Dummy product data for demonstration
  const dummyProduct = {
    id: productId || '404',
    title: 'Sample Product',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
  };
  
  const handleAddToCart = () => {
    if (isProductPage) {
      addToCart(dummyProduct);
      toast.success(`${dummyProduct.title} added to cart!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="max-w-lg mx-auto text-center p-8">
        {isProductPage ? (
          <>
            <h1 className="text-4xl font-bold text-primary mb-6">Product Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <img 
                src={dummyProduct.image} 
                alt={dummyProduct.title}
                className="w-full h-64 object-contain mb-4" 
              />
              <h2 className="text-2xl font-semibold text-primary mb-4">{dummyProduct.title}</h2>
              <p className="text-gray-600 mb-4">
                This is a sample product page. In a real implementation, this would show detailed 
                product information loaded from your product database.
              </p>
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-primary">${dummyProduct.price}</span>
                <div className="rating flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button 
                onClick={handleAddToCart}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
            </div>
            <Link to="/shop" className="btn-secondary inline-block">
              Back to Shop
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
            <h2 className="text-2xl font-semibold text-primary mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
