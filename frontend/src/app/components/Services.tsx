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
    <section id="services" className="bg-[#FCE7C8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
        </div>
        <div className="mt-16 max-w-2xl mx-auto lg:max-w-none">
          <dl className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col bg-[#B1C29E] rounded-lg shadow-md p-6 transition-all hover:scale-105 hover:bg-[#9DAC89]"
              >
                <dt className="flex items-center gap-x-3 text-xl font-semibold text-black">
                  <service.icon className="h-8 w-8 flex-none text-[#F0A04B]" />
                  {service.name}
                </dt>
                <dd className="mt-4 text-base text-gray-800">
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
