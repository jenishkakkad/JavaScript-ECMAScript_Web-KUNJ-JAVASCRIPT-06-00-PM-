
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { toast } from 'sonner';

interface ProductProps {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
}

const ProductCard = ({ id, title, image, category, price, oldPrice, rating }: ProductProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      title,
      price,
      image
    });
    
    toast.success(`${title} added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="relative mb-4">
        <span className="category-badge">{category}</span>
        <img src={image} alt={title} className="w-full h-48 object-contain" />
      </div>
      
      <h3 className="text-lg font-bold text-primary mb-2">
        <Link to={`/products/${id}`}>{title}</Link>
      </h3>
      
      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2">
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">${oldPrice.toFixed(2)}</span>
          )}
          <span className="font-bold text-primary">${price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition-all"
            aria-label={`Add ${title} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
