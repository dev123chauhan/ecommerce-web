import { Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="w-full md:w-1/3 p-6 rounded-lg border border-gray-300 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Phone className="mr-2 text-[#db4444]" size={24} /> Call To Us
        </h2>
        <p className="mb-2">We are available 24/7, 7 days a week.</p>
        <p>
          Phone: <span className="font-bold">+8801611112222</span>
        </p>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Mail className="mr-2 text-[#db4444]" size={24} /> Write To Us
        </h2>
        <p className="mb-2">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p>
          Email: <span className="text-sm font-bold">customer@shopvibe.com</span>
        </p>
        <p>
          Email: <span className="text-sm font-bold">support@shopvibe.com</span>
        </p>
      </div>
    </div>
  );
}