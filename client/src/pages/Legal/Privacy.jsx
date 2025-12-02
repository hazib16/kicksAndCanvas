const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We collect information you provide directly to us, such as when you create
          an account, make a purchase, or contact us for support.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to process your orders, communicate with you,
          and improve our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
        <p className="text-gray-600 mb-4">
          We do not sell, trade, or otherwise transfer your personal information to
          third parties without your consent.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate security measures to protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
        <p className="text-gray-600">
          If you have questions about this Privacy Policy, please contact us at
          privacy@kicksandcanvas.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
