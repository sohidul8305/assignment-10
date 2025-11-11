import React from "react";
import { Lightbulb, UserPlus, Search, BookOpen } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10 text-blue-500" />,
      title: "1. Sign Up",
      desc: "Create your free account in just a minute to get started.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-green-500" />,
      title: "2. Create Your Profile",
      desc: "Add your study interests, skills, and goals.",
    },
    {
      icon: <Search className="w-10 h-10 text-purple-500" />,
      title: "3. Find Study Partners",
      desc: "Browse and connect with students who share your interests.",
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
      title: "4. Start Learning Together",
      desc: "Collaborate and grow your knowledge as a team.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-center"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
