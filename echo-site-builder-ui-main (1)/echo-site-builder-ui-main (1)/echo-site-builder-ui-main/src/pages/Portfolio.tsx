
import { useState } from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import { Briefcase } from 'lucide-react';

// Sample portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'Organic Farming Initiative',
    category: 'Farming',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
    description: 'Transforming conventional farms into organic productive lands.'
  },
  {
    id: 2,
    title: 'Urban Garden Project',
    category: 'Urban',
    image: 'https://images.unsplash.com/photo-1581290688470-dc99ced1514c',
    description: 'Creating sustainable food sources in urban environments.'
  },
  {
    id: 3,
    title: 'School Nutrition Program',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1518962731808-510180c5f6e3',
    description: 'Bringing organic food education and healthy meals to schools.'
  },
  {
    id: 4,
    title: 'Sustainable Packaging',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    description: 'Developing eco-friendly packaging solutions for our products.'
  },
  {
    id: 5,
    title: 'Community Farmers Market',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9',
    description: 'Supporting local farmers through community market initiatives.'
  },
  {
    id: 6,
    title: 'Organic Certification Guidance',
    category: 'Consulting',
    image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9',
    description: 'Helping farmers achieve organic certification standards.'
  },
  {
    id: 7,
    title: 'Water Conservation Project',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc',
    description: 'Implementing water-saving techniques in organic farming.'
  },
  {
    id: 8,
    title: 'Farm-to-Table Restaurant Partnership',
    category: 'Partnership',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    description: 'Collaborating with restaurants to serve fresh organic produce.'
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'farming', name: 'Farming' },
  { id: 'urban', name: 'Urban' },
  { id: 'education', name: 'Education' },
  { id: 'innovation', name: 'Innovation' },
  { id: 'community', name: 'Community' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'environment', name: 'Environment' },
  { id: 'partnership', name: 'Partnership' }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = portfolioItems.filter(item => 
    activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <>
      <Banner title="Our Portfolio" backgroundImage="https://images.unsplash.com/photo-1530786916305-fb10e28f7ae6" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-subheading">Portfolio</span>
            <h2 className="section-heading">Our Recent Projects</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Explore our latest initiatives and projects that demonstrate our commitment to organic 
              agriculture, sustainability, and community engagement.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-light text-primary hover:bg-secondary hover:text-white'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`#project-${item.id}`}
                      className="bg-white text-primary p-3 rounded-full"
                      aria-label={`View ${item.title} details`}
                    >
                      <Briefcase size={20} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-light text-secondary px-3 py-1 rounded-full text-sm mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Portfolio;
