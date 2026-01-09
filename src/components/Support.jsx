import React from "react";
import { Mail, Phone, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-base-200 pt-24 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <HelpCircle size={48} className="mx-auto text-primary mb-3" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Help & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Need help? We’re here to support you.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* FAQ */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• How do I find a study partner?</li>
              <li>• How can I send a study request?</li>
              <li>• How do I update my profile?</li>
              <li>• Why can’t I send requests?</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Contact Support
            </h2>

            <div className="flex items-center gap-3 mb-3 text-gray-600 dark:text-gray-300">
              <Mail className="text-primary" />
              <span>si616132@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Phone className="text-primary" />
              <span>+880 1944709984</span>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Support;
