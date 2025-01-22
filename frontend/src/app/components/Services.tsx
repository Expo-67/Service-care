import { Wrench, Bell, BarChartIcon as ChartBar } from "lucide-react";

const services = [
  {
    name: "Digital Service Records",
    description:
      "Log and track your car's service history digitally, eliminating the need for paper records.",
    icon: Wrench,
  },
  {
    name: "Service Reminders",
    description:
      "Receive timely notifications for upcoming services, ensuring your vehicle is always in top condition.",
    icon: Bell,
  },
  {
    name: "Performance Insights",
    description:
      "Get valuable insights and analytics to improve your car's performance and efficiency.",
    icon: ChartBar,
  },
];

const Services = () => {
  return (
    <div
      id="services"
      className="min-h-screen bg-gradient-to-br from-white to-gray-900 p-4 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-900">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Everything you need for your car's maintenance
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-black">
                  <service.icon
                    className="h-5 w-5 flex-none text-gray-900"
                    aria-hidden="true"
                  />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-black">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Services;
