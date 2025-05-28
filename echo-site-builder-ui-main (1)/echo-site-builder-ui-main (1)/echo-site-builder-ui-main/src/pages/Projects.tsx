
import { useState } from 'react';
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import { Folder, ExternalLink } from 'lucide-react';

// Sample projects data
const projectsData = [
  {
    id: 1,
    title: 'Farm-to-Table Initiative',
    status: 'Completed',
    date: 'January 2023',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c',
    description: 'Connecting local organic farmers directly with restaurants to reduce food miles and increase freshness.',
    results: 'Reduced supply chain by 60% and increased farmer profits by 25%.'
  },
  {
    id: 2,
    title: 'Organic School Gardens',
    status: 'Ongoing',
    date: 'March 2023',
    image: 'https://images.unsplash.com/photo-1585265049935-dbbc2dbe7e9c',
    description: 'Installing organic vegetable gardens in schools to teach children about food production and healthy eating.',
    results: 'Implemented in 15 schools, reaching over 3,000 students.'
  },
  {
    id: 3,
    title: 'Sustainable Packaging Research',
    status: 'Ongoing',
    date: 'June 2023',
    image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307',
    description: 'Researching and developing biodegradable packaging solutions for our organic product line.',
    results: 'Reduced plastic use by 40% and testing new compostable materials.'
  },
  {
    id: 4,
    title: 'Community Composting',
    status: 'Completed',
    date: 'August 2023',
    image: 'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4',
    description: 'Establishing community composting centers to reduce waste and provide organic fertilizer for local gardens.',
    results: 'Diverted 50 tons of food waste from landfills in the first year.'
  },
  {
    id: 5,
    title: 'Water Conservation Program',
    status: 'Planning',
    date: 'October 2023',
    image: 'https://images.unsplash.com/photo-1625466997408-ac35e9af3737',
    description: 'Implementing advanced irrigation systems to reduce water usage in organic farming operations.',
    results: 'Expected to reduce water consumption by 30%.'
  },
  {
    id: 6,
    title: 'Organic Certification Workshop',
    status: 'Completed',
    date: 'November 2023',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764',
    description: 'Educational workshop series helping small farmers navigate the organic certification process.',
    results: 'Assisted 45 farms in obtaining organic certification.'
  }
];

const statusColors = {
  'Completed': 'bg-green-500',
  'Ongoing': 'bg-blue-500',
  'Planning': 'bg-yellow-500'
};

const filterOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Planning', label: 'Planning' }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projectsData.filter(
    project => filter === 'all' || project.status === filter
  );

  return (
    <>
      <Banner title="Our Projects" backgroundImage="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-subheading">Projects</span>
            <h2 className="section-heading">Our Initiatives</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Discover the projects we're working on to promote sustainable farming, 
              organic food accessibility, and environmental conservation.
            </p>
          </div>

          {/* Filter controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`px-5 py-2 rounded-full transition-colors ${
                  filter === option.value
                    ? 'bg-primary text-white'
                    : 'bg-light text-primary hover:bg-accent hover:text-primary-foreground'
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 ${statusColors[project.status as keyof typeof statusColors]} text-white text-xs px-3 py-1 rounded-full`}>
                    {project.status}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-sm mb-2">{project.date}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="bg-light p-3 rounded-lg mb-4">
                    <p className="font-medium text-primary">Results:</p>
                    <p className="text-gray-700">{project.results}</p>
                  </div>
                  <a
                    href={`#project-details-${project.id}`}
                    className="inline-flex items-center text-secondary hover:text-primary font-medium transition-colors"
                  >
                    <span>Learn More</span>
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">No projects found with the selected filter.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Have a Project Idea?</h3>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              We're always looking for new ways to promote organic agriculture and sustainable practices.
              If you have a project idea or want to collaborate, we'd love to hear from you.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              <Folder size={20} />
              <span>Propose a Project</span>
            </a>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Projects;
