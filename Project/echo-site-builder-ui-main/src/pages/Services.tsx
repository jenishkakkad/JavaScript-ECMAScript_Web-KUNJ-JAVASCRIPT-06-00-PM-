
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import { Settings, Check } from 'lucide-react';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Organic Farming Consultation',
    icon: 'farm',
    description: 'Expert advice on transitioning to organic farming methods and maintaining sustainable agricultural practices.',
    features: [
      'Soil health analysis',
      'Pest management strategies',
      'Crop rotation planning',
      'Certification guidance'
    ]
  },
  {
    id: 2,
    title: 'Supply Chain Management',
    icon: 'supply',
    description: 'Comprehensive solutions for managing your organic food supply chain from farm to customer.',
    features: [
      'Logistics optimization',
      'Quality control processes',
      'Inventory management',
      'Traceability systems'
    ]
  },
  {
    id: 3,
    title: 'Organic Certification Support',
    icon: 'certificate',
    description: 'Guidance through the complex process of obtaining and maintaining organic certification.',
    features: [
      'Documentation preparation',
      'Compliance assessment',
      'Inspection readiness',
      'Ongoing compliance monitoring'
    ]
  },
  {
    id: 4,
    title: 'Market Analysis & Strategy',
    icon: 'market',
    description: 'Research-based insights and strategic planning to help your organic business succeed in the marketplace.',
    features: [
      'Market trend analysis',
      'Competitive positioning',
      'Consumer behavior research',
      'Growth strategy development'
    ]
  },
  {
    id: 5,
    title: 'Product Development',
    icon: 'product',
    description: 'End-to-end support for developing new organic food products that meet market demands.',
    features: [
      'Concept development',
      'Ingredient sourcing',
      'Formulation testing',
      'Packaging design'
    ]
  },
  {
    id: 6,
    title: 'Sustainability Implementation',
    icon: 'sustainability',
    description: 'Practical solutions to enhance the environmental sustainability of your food business.',
    features: [
      'Carbon footprint assessment',
      'Waste reduction strategies',
      'Energy efficiency planning',
      'Water conservation methods'
    ]
  }
];

// Service icons component
const ServiceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'farm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
        </svg>
      );
    case 'supply':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case 'certificate':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'market':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'product':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'sustainability':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    default:
      return <Settings className="h-12 w-12" />;
  }
};

const Services = () => {
  return (
    <>
      <Banner title="Our Services" backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-subheading">Services</span>
            <h2 className="section-heading">What We Offer</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We provide comprehensive services to support organic food producers, distributors, 
              and retailers in every aspect of their business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div 
                key={service.id} 
                className="bg-light rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-6">
                  <ServiceIcon type={service.icon} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Need a Custom Solution?</h3>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              We understand that every business has unique needs. Contact us to discuss how we can 
              create a tailored service package for your specific requirements.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              <Settings size={20} />
              <span>Request Custom Service</span>
            </a>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Services;
