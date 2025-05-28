
interface BannerProps {
  title: string;
  backgroundImage?: string;
}

const Banner = ({ title, backgroundImage }: BannerProps) => {
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : { backgroundImage: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)' };

  return (
    <div 
      className="relative py-16 md:py-24 bg-cover bg-center flex items-center justify-center"
      style={bgStyle}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
      </div>
    </div>
  );
};

export default Banner;
