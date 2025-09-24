import React from "react";

const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50/40"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Simple, transparent pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-6 bg-white shadow-card">
            <div className="text-gray-900 font-semibold text-lg">Free</div>
            <div className="text-3xl font-bold my-2">$0</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4 list-disc list-inside">
              <li>Unlimited updates</li>
              <li>Social links</li>
              <li>QR code & sharing</li>
            </ul>
            <a
              href="#cta"
              className="inline-block w-full text-center py-2 rounded-lg bg-gray-900 text-white hover:opacity-90"
            >
              Get started
            </a>
          </div>
          <div className="border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-[2px] shadow-3d">
            <div className="bg-white rounded-[22px] p-6 h-full">
              <div className="flex items-center justify-between">
                <div className="text-gray-900 font-semibold text-lg">
                  Premium
                </div>
                <span className="text-xs bg-blue-600/10 text-blue-700 px-2 py-1 rounded-full">
                  Most popular
                </span>
              </div>
              <div className="text-3xl font-bold my-2">
                $9<span className="text-base">/mo</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-4 list-disc list-inside">
                <li>Advanced analytics</li>
                <li>AI suggestions</li>
                <li>Custom branding</li>
                <li>Priority support</li>
              </ul>
              <a
                href="#cta"
                className="inline-block w-full text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                Upgrade
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
