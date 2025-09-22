import ServiceFeatures from "../Home/ServiceFeatures";
import AboutContent from "./AboutContent";
import StatsCards from "./StatCard";
import TeamShowcase from "./TeamShowcase";
export default function About() {
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 container pt-20">
      <AboutContent/>
      <StatsCards/>
      <TeamShowcase/>
      <ServiceFeatures/>
    </div>
    </div>
  )
}
