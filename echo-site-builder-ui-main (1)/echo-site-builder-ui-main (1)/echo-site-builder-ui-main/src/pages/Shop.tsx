
import { useState } from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';

// Sample products data
const products = [
  {
    id: '1',
    title: 'Calabrese Broccoli',
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c',
    category: 'Vegetable',
    price: 13.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '2',
    title: 'Fresh Banana Fruites',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369',
    category: 'Fresh',
    price: 14.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '3',
    title: 'White Nuts',
    image: 'https://images.unsplash.com/photo-1544510807-78268e067c70',
    category: 'Millets',
    price: 15.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '4',
    title: 'Vegan Red Tomato',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337',
    category: 'Vegetable',
    price: 17.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '5',
    title: 'Mung Bean',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe68fc',
    category: 'Health',
    price: 11.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '6',
    title: 'Brown Hazelnut',
    image: 'https://images.unsplash.com/photo-1567892737950-30fd8f4b6423',
    category: 'Nuts',
    price: 12.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '7',
    title: 'Eggs',
    image: 'https://images.unsplash.com/photo-1489821235158-fa29867a40f1',
    category: 'Fresh',
    price: 17.00,
    oldPrice: 20.00,
    rating: 5
  },
  {
    id: '8',
    title: 'Zelco Suji Elaichi Rusk',
    image: 'https://images.unsplash.com/photo-1568127335281-818d1ddf8c5c',
    category: 'Fresh',
    price: 15.00,
    oldPrice: 20.00,
    rating: 5
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'vegetable', name: 'Vegetable' },
  { id: 'fresh', name: 'Fresh' },
  { id: 'millets', name: 'Millets' },
  { id: 'health', name: 'Health' },
  { id: 'nuts', name: 'Nuts' }
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Banner title="Shop" backgroundImage="https://images.unsplash.com/photo-1550989460-0adf9ea622e2" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Search and Filter */}
            <div className="w-full md:w-1/4 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Search Products</h3>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none px-4 py-2 w-full"
                  />
                  <button className="bg-primary text-white p-2">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button 
                        className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${activeCategory === category.id ? 'bg-primary text-white' : 'hover:bg-light text-primary'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-500">No products found matching your criteria</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Shop;
