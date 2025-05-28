
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';

// Sample products data
const featuredProducts = [
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
  }
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-light pt-12 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-subheading">100% Natural Food</span>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Choose the best healthier way of life</h1>
              <Link to="/shop" className="btn-secondary inline-block mt-4">
                Explore Now
              </Link>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf" alt="Organic food" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary/20 rounded-lg p-8 text-center">
              <span className="section-subheading">Natural!!</span>
              <h2 className="text-2xl font-bold text-primary mb-4">Get Garden Fresh Fruits</h2>
              <Link to="/shop" className="btn-secondary inline-block mt-2">Shop Now</Link>
            </div>
            <div className="bg-primary/10 rounded-lg p-8 text-center">
              <span className="section-subheading">Offer!!</span>
              <h2 className="text-2xl font-bold text-primary mb-4">Get 10% off on Vegetables</h2>
              <Link to="/shop" className="btn-secondary inline-block mt-2">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1573566657176-3d27e34979c4" alt="Organic vegetables" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <span className="section-subheading">About Us</span>
              <h2 className="section-heading">We Believe in Working Accredited Farmers</h2>
              <p className="text-gray-600 mb-6">
                Simply dummy text of the printing and typesetting industry. Lorem had ceased to 
                been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-accent rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Modern Agriculture Equipment</h3>
                    <p className="text-gray-600 text-sm">
                      Simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent rounded-full p-2 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">No growth hormones are used</h3>
                    <p className="text-gray-600 text-sm">
                      Simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn-primary inline-block">
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-subheading">Categories</span>
            <h2 className="section-heading">Our Products</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary inline-block">
              Load More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-subheading">Testimonial</span>
            <h2 className="section-heading">What Our Customers Saying?</h2>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="rating justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <p className="text-gray-600 italic mb-6">
              "Simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been."
            </p>
            
            <div className="mb-8">
              <h4 className="font-bold text-primary">Sara Taylor</h4>
              <p className="text-gray-600">Consumer</p>
            </div>
            
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-primary">100%</span>
                </div>
                <p className="text-gray-600 text-sm">Organic</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-primary">285</span>
                </div>
                <p className="text-gray-600 text-sm">Active Products</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-primary">350+</span>
                </div>
                <p className="text-gray-600 text-sm">Customers</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-secondary flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-primary">25+</span>
                </div>
                <p className="text-gray-600 text-sm">Years of Farming</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-yellowtail text-2xl text-accent mb-2 block">Offer</span>
            <h2 className="text-4xl font-bold mb-6">We Offer Organic For You</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="p-4">
                <img src="https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c" alt="Vegetable" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="p-4 bg-light">
                <h3 className="font-bold text-primary text-center">Vegetable</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="p-4">
                <img src="https://images.unsplash.com/photo-1546104586-acf016d4fcfb" alt="Fresh Fruit" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="p-4 bg-light">
                <h3 className="font-bold text-primary text-center">Fresh Fruit</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="p-4">
                <img src="https://images.unsplash.com/photo-1546137795-817b69498595" alt="Dairy Products" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="p-4 bg-light">
                <h3 className="font-bold text-primary text-center">Dairy Products</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="p-4">
                <img src="https://images.unsplash.com/photo-1539645094383-f6fe7a1e9955" alt="Fresh Nuts" className="w-full h-48 object-cover rounded-lg" />
              </div>
              <div className="p-4 bg-light">
                <h3 className="font-bold text-primary text-center">Fresh Nuts</h3>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="bg-accent text-primary px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all inline-block">
              Load More
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-subheading">News</span>
            <h2 className="section-heading">Discover weekly content about organic food & more</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba" alt="Organic Food" className="w-full h-64 object-cover" />
              <div className="p-6 bg-white">
                <div className="inline-block bg-white rounded-full px-4 py-1 text-sm text-primary font-medium border border-primary mb-4">
                  25 Nov
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  By Rachi Card
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">The Benefits of Vitamin D & How to Get It</h3>
                <p className="text-gray-600 mb-4">
                  Simply dummy text of the printing and typesetting industry. Lorem Ipsum
                </p>
                <Link to="/news/vitamin-d-benefits" className="btn-primary inline-block text-sm">
                  Read More
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img src="https://images.unsplash.com/photo-1509358271058-acd22cc93898" alt="Organic Vegetables" className="w-full h-64 object-cover" />
              <div className="p-6 bg-white">
                <div className="inline-block bg-white rounded-full px-4 py-1 text-sm text-primary font-medium border border-primary mb-4">
                  25 Nov
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  By Rachi Card
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Our Favorite Summertime Tomato</h3>
                <p className="text-gray-600 mb-4">
                  Simply dummy text of the printing and typesetting industry. Lorem Ipsum
                </p>
                <Link to="/news/summertime-tomato" className="btn-primary inline-block text-sm">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};

export default Home;
