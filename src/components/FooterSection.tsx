import { MapPin, Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 px-4 bg-primary">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-primary-foreground">BeautyVibe Studio</h3>
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>1st Floor, Avenue 37, HL City, Bahadurgarh</span>
        </div>
        <a
          href="https://instagram.com/beautyvibe.bahadurgarh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <Instagram className="h-4 w-4" />
          @beautyvibe.bahadurgarh
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
