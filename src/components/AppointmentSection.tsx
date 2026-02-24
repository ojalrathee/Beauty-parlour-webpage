import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

const categories = [
  "Beauty", "Hair Spa", "Hair", "Hair Colour", "Hair Treatment",
  "Hair Cut", "Hands & Feet", "Makeup", "Nails", "Relaxation", "Waxing",
];

const AppointmentSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    appointment_date: "",
    appointment_time: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.appointment_date) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "b9788baa-2a77-4758-a73b-5a7b69e01cdc",
          name: form.name,
          phone: form.phone,
          service: form.service,
          appointment_date: form.appointment_date,
          appointment_time: form.appointment_time,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast({
          title: "Thank you! Your appointment request has been sent successfully.",
        });
        setForm({ name: "", phone: "", service: "", appointment_date: "", appointment_time: "", message: "" });
      } else {
        toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = `https://wa.me/919050649900?text=${encodeURIComponent("Hello BeautyVibe Studio, I would like to book an appointment.")}`;

  return (
    <section id="appointment" className="py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-primary">
          Book Your Appointment
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Fill in the form below and we'll get back to you shortly
        </p>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
          <form onSubmit={handleConfirm} className="space-y-5">
            <Input
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="bg-card"
            />
            <Input
              placeholder="Phone Number *"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="bg-card"
            />
            <Select value={form.service} onValueChange={(v) => update("service", v)}>
              <SelectTrigger className="bg-card">
                <SelectValue placeholder="Choose Service *" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="Select Date *"
                value={form.appointment_date}
                onChange={(e) => update("appointment_date", e.target.value)}
                className="bg-card"
              />
              <Input
                type="time"
                placeholder="Select Time (Optional)"
                value={form.appointment_time}
                onChange={(e) => update("appointment_time", e.target.value)}
                className="bg-card"
              />
            </div>
            <Textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className="bg-card"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? "Sending..." : "Confirm Appointment"}
              </button>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold border-2 border-primary text-primary bg-transparent transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" />
                  Book via WhatsApp
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
