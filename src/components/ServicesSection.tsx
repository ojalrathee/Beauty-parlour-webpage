import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ServiceItem = { name: string; price: string };
type ServiceEntry = ServiceItem[] | Record<string, ServiceItem[]>;
const servicesData: Record<string, ServiceEntry> = {
  Beauty: {
    Threading: [
      { name: "Eyebrows Threading", price: "₹30" },
      { name: "Upper-Lips Threading", price: "₹20" },
      { name: "Lower-Lips Threading", price: "₹20" },
      { name: "Forehead Threading", price: "₹20" },
      { name: "Chin Threading", price: "₹20" },
      { name: "Side Lock Threading", price: "₹80" },
    ],
    Bleach: [
      { name: "Face Bleach (Basic)", price: "₹300" },
      { name: "Face Bleach (Advance)", price: "₹400" },
      { name: "Hands Bleach", price: "₹400" },
      { name: "Half Back Bleach", price: "₹300" },
      { name: "Full Back Bleach", price: "₹500" },
      { name: "Tummy Bleach", price: "₹400" },
      { name: "Full Front Bleach", price: "₹600" },
      { name: "Full Legs Bleach", price: "₹700" },
      { name: "Full Body Bleach", price: "₹2000" },
    ],
    "De-Tan": [
      { name: "Face De-Tan", price: "₹300" },
      { name: "Face & Neck De-Tan", price: "₹500" },
      { name: "Half Arm De-Tan", price: "₹350" },
      { name: "Full Hand De-Tan", price: "₹500" },
      { name: "Feet De-Tan", price: "₹450" },
      { name: "Half Leg De-Tan", price: "₹800" },
      { name: "Half Back De-Tan", price: "₹350" },
      { name: "Full Back De-Tan", price: "₹500" },
      { name: "Half Front De-Tan", price: "₹350" },
      { name: "Full Front De-Tan", price: "₹500" },
      { name: "Underarms De-Tan", price: "₹400" },
      { name: "Full Body De-Tan", price: "₹3200" },
    ],
    Cleanup: [
      { name: "Cleanup", price: "₹700" },
      { name: "Cleanup + Power Mask", price: "₹1200" },
    ],
    Facial: [
      { name: "Basic Facial", price: "₹1250" },
      { name: "Advance Facial", price: "₹1500 - ₹2500" },
      { name: "Luxury Facial", price: "₹4000 - ₹5000" },
      { name: "Power Mask", price: "₹500" },
    ],
  },
  Hair: {
    "Head Wash": [
      { name: "Basic Head Wash (w/ Conditioner)", price: "₹150" },
      { name: "L'Oreal Shampoo (Mask & Conditioner)", price: "₹250" },
      { name: "Schwarzkopf Shampoo (Mask & Conditioner)", price: "₹350" },
      { name: "Keratin Shampoo (Mask & Conditioner)", price: "₹450" },
    ],
    "Hair Styling": [
      { name: "Blow Dryer / Straight", price: "₹350" },
      { name: "Ironing", price: "₹300 - ₹500" },
      { name: "Crimping", price: "₹400 - ₹600" },
      { name: "Curls", price: "₹400 - ₹600" },
      { name: "Hair Do", price: "₹300 - ₹400" },
      { name: "Advance Hair Do", price: "₹500 - ₹1500" },
    ],
  },
  "Hair Spa": {
    "Hair Spa Treatments": [
      { name: "L'Oreal Hair Spa", price: "₹1200" },
      { name: "Dry Damage Hair Spa", price: "₹1500" },
      { name: "Anti-Dandruff Hair Spa", price: "₹1700" },
      { name: "Anti-Hairfall Hair Spa", price: "₹1900" },
      { name: "Keratin Hair Spa", price: "₹2200" },
    ],
  },
  "Hair Colour": {
    "Root Touch-Up": [
      { name: "Matrix Hair Colour", price: "₹1000" },
      { name: "L'Oreal Majirel Hair Colour", price: "₹1200" },
      { name: "L'Oreal Inoa Hair Colour", price: "₹1200" },
    ],
    "Global Colour": [
      { name: "L'Oreal Majirel", price: "₹3500" },
      { name: "L'Oreal Inoa (Ammonia Free)", price: "₹4000" },
    ],
    Highlights: [
      { name: "Highlight (Per Streak)", price: "₹350" },
      { name: "Global Highlight", price: "₹5500" },
    ],
  },
  "Hair Texture": {
    "Texture Services": [
      { name: "Smoothening", price: "₹3000 - ₹4000" },
      { name: "Rebonding", price: "₹3000 - ₹4000" },
      { name: "Keratin", price: "₹4000 - ₹5000" },
      { name: "Botox", price: "₹5000 - ₹6000" },
    ],
  },
  "Hair Cut": {
    "Hair Cut Services": [
      { name: "Trimming", price: "₹200" },
      { name: "Split Ends", price: "₹350" },
      { name: "Baby Cut", price: "₹300" },
      { name: "U Cut", price: "₹300" },
      { name: "V Cut", price: "₹300" },
      { name: "Step Cut", price: "₹400" },
      { name: "Layer Cut", price: "₹400" },
      { name: "Advance Hair Cut", price: "₹500" },
    ],
  },
  "Hands & Feet": {
    Manicure: [
      { name: "Basic", price: "₹400" },
      { name: "Advance", price: "₹700" },
      { name: "Luxury", price: "₹1000" },
    ],
    Pedicure: [
      { name: "Basic", price: "₹550" },
      { name: "Advance", price: "₹850" },
      { name: "Luxury", price: "₹1500" },
    ],
  },
  Waxing: {
    "Face Wax": [
      { name: "Upper Lip Wax", price: "₹50" },
      { name: "Chin Wax", price: "₹50" },
      { name: "Nose Wax", price: "₹100" },
      { name: "Forehead Wax", price: "₹100" },
      { name: "Half Neck Wax", price: "₹100" },
      { name: "Full Neck Wax", price: "₹200" },
      { name: "Side Lock Wax", price: "₹200" },
      { name: "Face Wax Without Neck", price: "₹500" },
    ],
    "Regular Wax": [
      { name: "Under Arms Wax", price: "₹80" },
      { name: "Full Arms Wax", price: "₹200" },
      { name: "Half Arms Wax", price: "₹150" },
      { name: "Full Legs Wax", price: "₹400" },
      { name: "Half Legs Wax", price: "₹200" },
      { name: "Full Front Wax", price: "₹800" },
      { name: "Tummy Wax", price: "₹300" },
      { name: "Full Back Wax", price: "₹500" },
      { name: "Half Back Wax", price: "₹250" },
      { name: "B-Wax", price: "₹1500" },
      { name: "Full Body Wax", price: "₹1600" },
    ],
    "Liposoluble Wax": [
      { name: "Under Arms Wax", price: "₹150" },
      { name: "Full Arms Wax", price: "₹400" },
      { name: "Half Arms Wax", price: "₹250" },
      { name: "Full Legs Wax", price: "₹800" },
      { name: "Half Legs Wax", price: "₹400" },
      { name: "Tummy Wax", price: "₹500" },
      { name: "Full Back Wax", price: "₹800" },
      { name: "Half Back Wax", price: "₹500" },
      { name: "B-Wax", price: "₹2500" },
      { name: "Full Body Wax", price: "₹2300" },
    ],
  },
  Relaxation: {
    "Head Massage": [
      { name: "Head Massage", price: "₹350" },
      { name: "Head Massage with Wash", price: "₹500" },
    ],
    "Body Massage": [
      { name: "Body Massage", price: "₹1200" },
      { name: "Body Massage with Steam", price: "₹1500" },
      { name: "Full Hands Massage", price: "₹400" },
      { name: "Full Back Massage", price: "₹400" },
      { name: "Full Legs Massage", price: "₹600" },
    ],
    "Body Polishing": [
      { name: "Basic", price: "₹2500" },
      { name: "Advance", price: "₹3200" },
      { name: "Luxury", price: "₹4200" },
      { name: "Full Body Scrub", price: "₹1500" },
      { name: "Back Scrub", price: "₹300" },
      { name: "Front Scrub", price: "₹400" },
      { name: "Hand Scrub", price: "₹400" },
      { name: "Leg Scrub", price: "₹700" },
    ],
  },
};

const ServicesSection = () => {
  const [search, setSearch] = useState("");

  const isSearching = search.trim().length > 0;

  const flatResults = useMemo(() => {
    if (!isSearching) return [];
    const q = search.toLowerCase();
    const results: { category: string; subCategory?: string; item: string; price: string }[] = [];
    for (const [cat, services] of Object.entries(servicesData)) {
      if (Array.isArray(services)) {
        services.forEach((s) => {
          if (s.name.toLowerCase().includes(q)) results.push({ category: cat, item: s.name, price: s.price });
        });
      } else {
        for (const [sub, items] of Object.entries(services)) {
          items.forEach((s) => {
            if (s.name.toLowerCase().includes(q)) results.push({ category: cat, subCategory: sub, item: s.name, price: s.price });
          });
        }
      }
    }
    return results;
  }, [search, isSearching]);

  const filtered = useMemo(() => {
    if (!isSearching) return servicesData;
    const q = search.toLowerCase();
    const result: Record<string, ServiceEntry> = {};
    for (const [cat, services] of Object.entries(servicesData)) {
      if (cat.toLowerCase().includes(q)) {
        result[cat] = services;
      } else if (Array.isArray(services)) {
        const matched = services.filter((s) => s.name.toLowerCase().includes(q));
        if (matched.length) result[cat] = matched;
      } else {
        const matchedGroups: Record<string, ServiceItem[]> = {};
        for (const [sub, items] of Object.entries(services)) {
          if (sub.toLowerCase().includes(q)) {
            matchedGroups[sub] = items;
          } else {
            const m = items.filter((s) => s.name.toLowerCase().includes(q));
            if (m.length) matchedGroups[sub] = m;
          }
        }
        if (Object.keys(matchedGroups).length) result[cat] = matchedGroups;
      }
    }
    return result;
  }, [search, isSearching]);

  const renderServices = (services: ServiceEntry) => {
    if (Array.isArray(services)) {
      return (
        <ul className="space-y-3">
          {services.map((service) => (
            <li key={service.name} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
              <span className="text-foreground">{service.name}</span>
              <span className="font-semibold text-foreground">{service.price}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-5">
        {Object.entries(services).map(([subHeading, items]) => (
          <div key={subHeading}>
            <h4 className="text-base font-bold mb-2 text-primary">{subHeading}</h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.name} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-foreground">{item.name}</span>
                  <span className="font-semibold text-foreground">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-primary">
          Our Services
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Explore our wide range of beauty & wellness services
        </p>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>

          {isSearching ? (
            flatResults.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No services found.</p>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Search Results</h3>
                <ul className="space-y-3">
                  {flatResults.map((r) => (
                    <li key={`${r.category}-${r.subCategory ?? ""}-${r.item}`} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <div>
                        <span className="text-foreground">{r.item}</span>
                        <span className="text-muted-foreground text-xs ml-2">
                          {r.subCategory ? `${r.category} › ${r.subCategory}` : r.category}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">{r.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {Object.entries(filtered).map(([category, services]) => (
                <AccordionItem
                  key={category}
                  value={category}
                  className="border-b border-border/50 px-0"
                >
                  <AccordionTrigger className="text-lg font-bold hover:no-underline text-primary">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    {renderServices(services)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
