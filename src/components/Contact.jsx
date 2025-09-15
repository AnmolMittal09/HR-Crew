import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800 text-center">
      <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
      <div className="space-y-4">
        <p className="flex items-center justify-center">
          <MapPin className="mr-2" /> 123 Music Avenue
        </p>
        <p className="flex items-center justify-center">
          <Phone className="mr-2" /> +1 555 123456
        </p>
        <p className="flex items-center justify-center">
          <Mail className="mr-2" /> info@hrcrew.com
        </p>
      </div>
    </section>
  );
};

export default Contact;
