import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Add this import
import Button from "../common/Button";
import { authService } from "../api/services/authService";
import { toast } from "sonner";

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 Initialize navigate

 const handleDeleteAccount = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await authService.deleteAccount();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success(response.message || "Account deleted successfully");

    // Give toast time to show
    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 1000);
  } catch (err) {
    const msg = err.response?.data?.message || "Failed to delete account";
    setError(msg);
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="container max-w-7xl mx-auto pt-20 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Button
          text="Delete Account"
          className="text-white primaryColor w-full"
          onClick={() => setShowModal(true)}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Delete Account
              </h2>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. All your data will be permanently
                deleted.
              </p>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 primaryColor text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




// import { useState } from "react";
// import axios from "axios";
// import Button from "../common/Button";
// export default function Account() {
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const handleDeleteAccount = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("token");
//       console.log("Token:", token);

//       const response = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/users/delete-account`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       alert(response.data.message || "Account deleted successfully");
//       window.location.href = "/";
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete account");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setError("");
//   };

//   return (
//     <div className="container max-w-7xl mx-auto pt-20 min-h-screen flex items-center justify-center">
//       <div className="max-w-md w-full">
//         <Button
//           text="Delete Account"
//           className="text-white primaryColor w-full"
//           onClick={() => {
//             console.log("Button clicked");
//             setShowModal(true);
//           }}
//         />
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 Delete Account
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 This action cannot be undone. All your data will be permanently
//                 deleted.
//               </p>

//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleCloseModal}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
//                   disabled={loading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleDeleteAccount();
//                   }}
//                   className="flex-1 px-4 py-2 primaryColor text-white rounded-full  disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={loading}
//                 >
//                   {loading ? "Deleting..." : "Yes, Delete"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
