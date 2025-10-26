import AboutContent from "../components/About/AboutContent";
import Stats from "../components/About/StatCards";
import TeamShowcase from "../components/About/TeamShowcase";
import ServiceFeatures from "../components/ServiceFeatures/ServiceFeatures";
export default function About() {
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 container pt-20">
      <AboutContent />
      <Stats />
      <TeamShowcase />
      <ServiceFeatures />
    </div>
    </div>
  )
}
