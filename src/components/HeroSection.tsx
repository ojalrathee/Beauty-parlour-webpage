const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight text-primary">
          BeautyVibe Studio
        </h1>
        <p className="text-lg md:text-xl text-foreground mb-12 font-normal leading-relaxed tracking-wide">
          Where Elegance Meets Excellence – Reveal Your Inner Glow.
        </p>
        <a
          href="#appointment"
          className="inline-block bg-primary text-primary-foreground font-bold px-12 py-4 rounded-full text-lg transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
