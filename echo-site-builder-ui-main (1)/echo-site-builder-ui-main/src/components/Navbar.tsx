
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../store/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Organick" className="h-10" />
            <span className="text-primary text-2xl font-bold">Organick</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-primary hover:text-secondary transition-colors">Home</Link>
            <Link to="/about" className="text-primary hover:text-secondary transition-colors">About</Link>
            <div className="relative group">
              <Link to="#" className="text-primary hover:text-secondary transition-colors flex items-center gap-1">
                Pages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
                <Link to="/team" className="block px-4 py-2 text-primary hover:bg-light">Our Team</Link>
                <Link to="/portfolio" className="block px-4 py-2 text-primary hover:bg-light">Portfolio</Link>
                <Link to="/services" className="block px-4 py-2 text-primary hover:bg-light">Services</Link>
                <Link to="/projects" className="block px-4 py-2 text-primary hover:bg-light">Projects</Link>
                <Link to="/news" className="block px-4 py-2 text-primary hover:bg-light">News</Link>
              </div>
            </div>
            <Link to="/shop" className="text-primary hover:text-secondary transition-colors">Shop</Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center border border-slate-200 rounded-full p-1">
              <input 
                type="text" 
                placeholder="Search..." 
                className="outline-none px-3 text-sm w-32 lg:w-48"
              />
              <button className="bg-primary text-white p-2 rounded-full">
                <Search size={16} />
              </button>
            </div>
            
            <Link to="/cart" className="flex items-center gap-2 bg-light rounded-full p-2 relative">
              <ShoppingCart className="text-primary" size={20} />
              <span className="text-primary font-medium hidden sm:inline-block">Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-primary p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-slate-200">
            <ul className="flex flex-col gap-4">
              <li><Link to="/" className="block text-primary hover:text-secondary">Home</Link></li>
              <li><Link to="/about" className="block text-primary hover:text-secondary">About</Link></li>
              <li><Link to="/shop" className="block text-primary hover:text-secondary">Shop</Link></li>
              <li><Link to="/projects" className="block text-primary hover:text-secondary">Projects</Link></li>
              <li><Link to="/news" className="block text-primary hover:text-secondary">News</Link></li>
              <li>
                <details className="group">
                  <summary className="text-primary hover:text-secondary list-none flex justify-between cursor-pointer">
                    Pages
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </summary>
                  <ul className="mt-2 pl-4">
                    <li><Link to="/team" className="block py-2 text-primary hover:text-secondary">Our Team</Link></li>
                    <li><Link to="/portfolio" className="block py-2 text-primary hover:text-secondary">Portfolio</Link></li>
                    <li><Link to="/services" className="block py-2 text-primary hover:text-secondary">Services</Link></li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
