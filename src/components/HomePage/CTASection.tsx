import React from "react";

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-1 shadow-3d-mega">
          <div className="glass-card rounded-[22px] p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Create Your Free Digital Card Today 🚀
            </h3>
            <p className="text-gray-600 mb-6">
              Takes less than 2 minutes. No credit card required.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-3d-button hover:from-blue-700 hover:to-purple-700"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
