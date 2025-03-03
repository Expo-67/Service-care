import { Wrench, Bell, BarChartIcon as ChartBar } from "lucide-react";

const services = [
  {
    name: "Digital Service Records",
    description:
      "Easily log service details digitally, eliminating the need for paper records.",
    icon: Wrench,
  },
  {
    name: "Service Reminders",
    description:
      "Receive timely notifications for upcoming services, ensuring your vehicle is always in top condition.",
    icon: Bell,
  },
  {
    name: "Service Record Tracking",
    description:
      "Track your car's service history effortlessly, maintaining an organized overview of all your vehicle's services.",
    icon: ChartBar,
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </p>
        </div>
        <div className="mt-20 max-w-2xl mx-auto lg:max-w-none">
          <dl className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
              >
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-800">
                  <service.icon
                    className="h-6 w-6 flex-none text-gray-600"
                    aria-hidden="true"
                  />
                  {service.name}
                </dt>
                <dd className="mt-4 flex-grow text-base text-gray-700">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Services;
