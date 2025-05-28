
import { useState } from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import { Calendar, User, ArrowRight, Newspaper } from 'lucide-react';

// Sample news/blog data
const newsArticles = [
  {
    id: 1,
    title: 'The Benefits of Eating Seasonal Organic Produce',
    excerpt: 'Discover how eating organic produce in season can improve your health, support local farmers, and protect the environment.',
    date: 'May 15, 2023',
    author: 'Emma Johnson',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c',
    tags: ['seasonal', 'health', 'organic'],
    readTime: '5 min'
  },
  {
    id: 2,
    title: 'Organic Farming Techniques That Protect Biodiversity',
    excerpt: 'Learn about innovative organic farming methods that help preserve and enhance biodiversity while producing nutritious food.',
    date: 'April 22, 2023',
    author: 'Michael Smith',
    category: 'Farming',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
    tags: ['farming', 'biodiversity', 'sustainability'],
    readTime: '7 min'
  },
  {
    id: 3,
    title: 'Understanding Organic Certification Standards',
    excerpt: 'A comprehensive guide to understanding what organic certification really means and how to identify truly organic products.',
    date: 'March 10, 2023',
    author: 'David Rodriguez',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1618682814542-cad38a1fa98a',
    tags: ['certification', 'standards', 'shopping'],
    readTime: '8 min'
  },
  {
    id: 4,
    title: 'Organic Food on a Budget: Smart Shopping Tips',
    excerpt: 'Practical advice for incorporating more organic foods into your diet without breaking the bank.',
    date: 'February 28, 2023',
    author: 'Sarah Wilson',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1595665593673-bf1ad72905c0',
    tags: ['budget', 'shopping', 'tips'],
    readTime: '6 min'
  },
  {
    id: 5,
    title: 'The Environmental Impact of Organic vs. Conventional Farming',
    excerpt: 'An evidence-based comparison of how organic and conventional farming methods affect soil health, water quality, and climate change.',
    date: 'January 15, 2023',
    author: 'Robert Chen',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1562669948-95269c5a4b46',
    tags: ['environment', 'comparison', 'sustainability'],
    readTime: '10 min'
  },
  {
    id: 6,
    title: 'Cooking with Organic Ingredients: Chef\'s Tips',
    excerpt: 'Professional chefs share their secrets for making the most of organic ingredients in your home cooking.',
    date: 'December 5, 2022',
    author: 'Julia Martinez',
    category: 'Cooking',
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf',
    tags: ['cooking', 'recipes', 'tips'],
    readTime: '7 min'
  }
];

const categories = [
  'All',
  'Health',
  'Farming',
  'Environment',
  'Lifestyle',
  'Education',
  'Cooking'
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Banner title="News & Articles" backgroundImage="https://images.unsplash.com/photo-1501504905252-473c47e087f8" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-subheading">Latest News</span>
            <h2 className="section-heading">From Our Blog</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Stay updated with the latest news, tips, and insights about organic food, 
              sustainable farming, and healthy living.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Sidebar/Filters */}
            <div className="w-full md:w-1/4 space-y-8">
              {/* Search */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Search Articles</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                          activeCategory === category 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-light text-gray-700'
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Preview */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {newsArticles.slice(0, 3).map(article => (
                    <div key={`recent-${article.id}`} className="flex gap-3 items-start">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-primary">
                          <a href={`#article-${article.id}`} className="hover:text-secondary transition-colors">
                            {article.title.length > 40 ? article.title.substring(0, 40) + '...' : article.title}
                          </a>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(newsArticles.flatMap(article => article.tags))).map((tag, index) => (
                    <button
                      key={index}
                      className="bg-light px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-accent hover:text-primary transition-colors"
                      onClick={() => setSearchTerm(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Articles */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredArticles.map(article => (
                  <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="inline-flex items-center">
                          <Calendar size={14} className="mr-1" /> {article.date}
                        </span>
                        <span className="inline-flex items-center">
                          <User size={14} className="mr-1" /> {article.author}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="bg-light text-secondary text-xs px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">
                        <a href={`#article-${article.id}`} className="hover:text-secondary transition-colors">
                          {article.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{article.readTime} read</span>
                        <a
                          href={`#article-${article.id}`}
                          className="inline-flex items-center text-secondary hover:text-primary font-medium transition-colors"
                        >
                          <span>Read More</span>
                          <ArrowRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12 bg-light rounded-lg">
                  <Newspaper size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Articles Found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
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

export default News;
