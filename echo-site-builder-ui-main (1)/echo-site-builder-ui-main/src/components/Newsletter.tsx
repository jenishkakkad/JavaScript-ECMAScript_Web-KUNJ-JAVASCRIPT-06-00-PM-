import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setStatus('loading');
    setMessage('');

    // Validate email
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      // Send welcome email to subscriber
      const response = await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          to_email: email,
          to_name: email.split('@')[0], // Use part before @ as name
          message: 'Thank you for subscribing to our newsletter!',
          // Add any other template variables you want to send
        }
      );

      if (response.status === 200) {
        setStatus('success');
        setMessage('Thank you for subscribing! Please check your email for confirmation.');
        setEmail('');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <section className="bg-newsletter py-12 my-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-2">Subscribe to</h2>
            <h2 className="text-3xl font-bold text-white">our Newsletter</h2>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="px-6 py-3 rounded-lg w-full sm:w-64 lg:w-80 disabled:opacity-50"
                  disabled={status === 'loading'}
                />
                {status === 'error' && (
                  <p className="absolute -bottom-6 left-0 text-red-500 text-sm">{message}</p>
                )}
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`
                  bg-primary text-white px-6 py-3 rounded-lg transition-all
                  ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'}
                  min-w-[120px]
                `}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Success Message */}
        {status === 'success' && (
          <div className="mt-4 text-center md:text-right">
            <p className="text-green-400 font-medium">{message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
