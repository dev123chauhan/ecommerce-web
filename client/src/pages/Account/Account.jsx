import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import EditProfile from "./EditProfile";
import PaymentOption from "./PaymentOption";

const UserProfileContent = () => {
    const { user } = useSelector((state) => state.auth);
  return (
    <>
      <h1 className="text-2xl font-bold text-red-500 mb-6">User Profile</h1>
      <form className="space-y-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w">
            <label className="block text-sm font-medium  mb-1">User Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400" value={user?.username} readOnly />
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium  mb-1">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400" value={user?.email} readOnly />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium  mb-1">Address</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400" value={user?.address} readOnly />
          </div>
        </div>
      </form>
    </>
  );
};

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useSelector((state) => state.auth);

  const getNavLinkClass = (tabName) => {
    return `block ${activeTab === tabName ? 'text-red-500' : ''} hover:text-red-500`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfileContent user={user} />;
      case 'changePassword':
        return <ChangePassword />;
        case 'editProfile':
          return <EditProfile />;
          case 'payment':
          return <PaymentOption />;
      default:
        return <UserProfileContent user={user} />;
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="p-4 md:p-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 mt-10">
      <header className="flex justify-between items-center mb-8">
        <nav className="text-sm">
          <span>Home</span> / <span className="font-semibold">My Account</span>
        </nav>
        <div className="text-sm">
          Welcome! <span className="text-red-500">{user?.username}</span>
        </div>
      </header>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <aside className="w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Manage My Account</h2>
          <nav className="space-y-2">
            <Link 
              to="" 
              className={getNavLinkClass('profile')}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </Link>
            <Link 
              to="" 
              className={getNavLinkClass('editProfile')}
              onClick={() => setActiveTab('editProfile')}
            >
              Edit Profile
            </Link>
            <Link 
              to="" 
              className={getNavLinkClass('changePassword')}
              onClick={() => setActiveTab('changePassword')}
            >
              Change Password
            </Link>
            <Link 
              to="" 
              className={getNavLinkClass('payment')}
              onClick={() => setActiveTab('payment')}
            >
              My Payment Options
            </Link>
          </nav>

          <h2 className="text-xl font-bold mt-6 mb-4">My Orders</h2>
          <nav className="space-y-2">
            <Link to="" className="block">My Returns</Link>
            <Link to="" className="block">My Cancellations</Link>
          </nav>
          <h2 className="text-xl font-bold mt-6 mb-4">My Wishlist</h2>
        </aside>
        <main className="w-full md:w-3/4">
          {renderContent()}
        </main>
      </div>
    </div>
    </div>
  );
};

export default Account;