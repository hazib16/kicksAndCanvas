const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing and using KicksAndCanvas, you accept and agree to be bound
          by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p className="text-gray-600 mb-4">
          Permission is granted to temporarily download one copy of the materials
          on KicksAndCanvas's website for personal, non-commercial transitory viewing only.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          The materials on KicksAndCanvas's website are provided on an 'as is' basis.
          KicksAndCanvas makes no warranties, expressed or implied.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact</h2>
        <p className="text-gray-600">
          For questions about these Terms, please contact us at legal@kicksandcanvas.com
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
