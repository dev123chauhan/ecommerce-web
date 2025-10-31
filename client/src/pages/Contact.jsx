import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import ContactMap from "../components/Contact/ContactMap";
import ContactInfo from "../components/Contact/ContactInfo";
import ContactForm from "../components/Contact/ContactForm";
import { contactService } from "../api/services/contactService";
import { validateEmail, validateMessage, validateName } from "../validation/validation";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: (values) => {
      const errors = {};

      const nameValidation = validateName(values.name);
      if (!nameValidation.isValid) errors.name = nameValidation.message;

      const emailValidation = validateEmail(values.email);
      if (!emailValidation.isValid) errors.email = emailValidation.message;

      const messageValidation = validateMessage(values.message);
      if (!messageValidation.isValid) errors.message = messageValidation.message;

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await contactService.sendMessage(values);
        toast.success("Thanks for contacting us!");
        resetForm();
      } catch (err) {
        console.error(err);
        toast.error("Failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 container p-4 mt-10">
        <nav className="py-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="" className="font-bold">Contact</Link></li>
          </ul>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          <ContactInfo />
          <ContactForm formik={formik} loading={loading} />
        </div>

        <ContactMap />
      </div>
    </div>
  );
};

export default Contact;








// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useFormik } from "formik";
// import axios from "axios";
// import { toast } from "sonner";
// import { validateEmail, validateMessage, validateName } from "../Validation/validation";
// import ContactMap from "../components/Contact/ContactMap";
// import ContactInfo from "../components/Contact/ContactInfo";
// import ContactForm from "../components/Contact/ContactForm";
// const Contact = () => {
//   const baseUrl = import.meta.env.VITE_API_URL;
//   const [loading, setLoading] = useState(false);
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       message: "",
//     },
//     validate: (values) => {
//       const errors = {};

//       const nameValidation = validateName(values.name);
//       if (!nameValidation.isValid) {
//         errors.name = nameValidation.message;
//       }

//       const emailValidation = validateEmail(values.email);
//       if (!emailValidation.isValid) {
//         errors.email = emailValidation.message;
//       }

//       const messageValidation = validateMessage(values.message);
//       if (!messageValidation.isValid) {
//         errors.message = messageValidation.message;
//       }

//       return errors;
//     },
//     onSubmit: async (values, { resetForm }) => {
//       setLoading(true);
//       try {
//         await axios.post(`${baseUrl}/contact`, values);
//         resetForm();
//         toast.success("Thanks for contacting us!");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 container p-4 mt-10">
//         <nav className="py-4">
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="" className="font-bold">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         <div className="flex flex-col md:flex-row gap-8">
//           <ContactInfo />

//           <ContactForm formik={formik} loading={loading} />
//         </div>

//         <ContactMap />
//       </div>
//     </div>
//   );
// };

// export default Contact;

