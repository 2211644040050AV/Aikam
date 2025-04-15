import React from 'react';
import {motion} from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      className="p-6 max-w-4xl mx-auto space-y-6 text-sm text-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Privacy Policy</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">Information Collection</h2>
          <p>
            Aikam India collects personal information, including contact and medical data,
            necessary to provide and improve services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Use of Data</h2>
          <p>
            Your data is used to facilitate services, enhance user experience, fulfill legal requirements,
            and for business analysis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Data Sharing</h2>
          <p>
            Data may be shared with third-party service providers, regulatory bodies, or as required by law.
            Aikam India ensures reasonable safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Security</h2>
          <p>
            Aikam India implements industry-standard security practices to protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">User Rights</h2>
          <p>
            Users have the right to access, correct, and delete their data, as well as withdraw consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Changes to Privacy Policy</h2>
          <p>
            Aikam India may update this policy at its discretion. Continued use of the service implies
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p>
            For privacy-related concerns, contact:{' '}
            <a href="mailto:care@AikamIndia.com" className="text-blue-600 underline">care@AikamIndia.com</a>
          </p>
        </section>
      </motion.div>
    </>
  );
};

export default PrivacyPolicy;
