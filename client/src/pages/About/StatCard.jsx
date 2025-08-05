import { Store, DollarSign, ShoppingBag, Coins } from 'lucide-react';
import PropTypes from 'prop-types';
const StatsCard = ({ icon: Icon, value, description, highlighted = false }) => (
  <div className={`p-6 rounded-lg shadow-md ${highlighted ? 'bg-red-500 text-white' : ''}`}>
    <div className={`dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${highlighted ? 'bg-red-400' : 'bg-gray-200'}`}>
      <Icon size={32} className={highlighted ? 'text-white' : 'text-black'} />
    </div>
    <h2 className="text-3xl font-bold mb-2">{value}</h2>
    <p className={`text-sm ${highlighted ? 'text-red-100' : 'text-gray-600'}`}>{description}</p>
  </div>
);
StatsCard.propTypes = {
    icon: PropTypes.elementType.isRequired, 
    value: PropTypes.string.isRequired, 
    description: PropTypes.string.isRequired, 
    highlighted: PropTypes.bool, 
  };
const StatsCards = () => {
  const stats = [
    { icon: Store, value: '10.5k', description: 'Sellers active on our site' },
    { icon: DollarSign, value: '33k', description: 'Monthly Product Sale', highlighted: true },
    { icon: ShoppingBag, value: '45.5k', description: 'Customers active on our site' },
    { icon: Coins, value: '25k', description: 'Annual gross sale on our site' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;