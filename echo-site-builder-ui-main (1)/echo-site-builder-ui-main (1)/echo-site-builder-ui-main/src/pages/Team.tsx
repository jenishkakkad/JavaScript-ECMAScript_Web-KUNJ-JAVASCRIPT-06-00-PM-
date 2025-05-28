
import Banner from '../components/Banner';
import Newsletter from '../components/Newsletter';
import { Users } from 'lucide-react';

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    position: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Dedicated to bringing organic food to everyone\'s table.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Sales Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Expert in organic food distribution and customer relations.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  },
  {
    id: 3,
    name: 'Michael Johnson',
    position: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Ensuring the highest quality of all our organic products.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  },
  {
    id: 4,
    name: 'Emily Wilson',
    position: 'Farming Expert',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Specialized in organic farming techniques and sustainability.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  },
  {
    id: 5,
    name: 'Robert Brown',
    position: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Creative mind behind our organic brand and campaigns.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  },
  {
    id: 6,
    name: 'Sarah Davis',
    position: 'Quality Control',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    description: 'Ensures that all products meet our strict organic standards.',
    socials: [
      { name: 'facebook', url: '#' },
      { name: 'twitter', url: '#' },
      { name: 'instagram', url: '#' },
    ]
  }
];

const Team = () => {
  return (
    <>
      <Banner title="Our Team" backgroundImage="https://images.unsplash.com/photo-1498579150354-977475b7ea0b" />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="section-subheading">Our Team</span>
            <h2 className="section-heading">Meet Our Experts</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our team of dedicated professionals is committed to bringing you the finest organic products 
              and ensuring a sustainable approach to farming and food production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-light rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex justify-center space-x-4">
                    {member.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url} 
                        className="text-secondary hover:text-primary transition-colors"
                        aria-label={`${member.name}'s ${social.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path 
                            fillRule="evenodd" 
                            d={
                              social.name === 'facebook' 
                                ? "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                                : social.name === 'twitter' 
                                  ? "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" 
                                  : "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            } 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Join Our Team</h3>
            <p className="max-w-2xl mx-auto text-gray-600 mb-8">
              Are you passionate about organic food and sustainable agriculture? We're always looking for talented 
              individuals to join our growing team.
            </p>
            <a href="/contact" className="btn-primary inline-flex items-center gap-2">
              <Users size={20} />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </>
  );
};

export default Team;
