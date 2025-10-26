import { stats } from "../../lib/stats";
const StatsCard = ({ icon: Icon, value, description, highlighted = false }) => (
  <div className={`p-6 rounded-lg shadow-md ${highlighted ? 'primaryColor text-white' : ''}`}>
    <div className={`dark:bg-gray-800  dark:border-gray-700 dark:text-white dark:placeholder-gray-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${highlighted ? 'bg-red-400' : 'bg-gray-200'}`}>
      <Icon size={32}  className={highlighted ? 'text-white' : 'text-black dark:text-white'} />
    </div>
    <h2 className="text-3xl font-bold mb-2">{value}</h2>
    <p className={`text-sm ${highlighted ? 'text-red-100' : 'text-gray-600'}`}>{description}</p>
  </div>
);
const Stats = () => {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Stats;