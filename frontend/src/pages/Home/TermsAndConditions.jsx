import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} 
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}className="p-6 max-w-4xl mx-auto space-y-6 text-sm text-gray-700">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Terms & Conditions</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">Termination Rights</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Breach of applicable laws or terms.</li>
            <li>Information cannot be verified.</li>
            <li>Actions causing legal liability.</li>
            <li>Legal requirement or consent withdrawal.</li>
            <li>Discontinuation due to commercial reasons.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Post-Termination</h2>
          <p>
            Once terminated, users may not reuse the website under any account. Data may be deleted unless legally restricted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Force Majeure</h2>
          <p>
            Aikam India is not liable for disruptions caused by natural disasters, riots, legal actions, etc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Governing Law & Dispute Resolution</h2>
          <p>
            Governed by Indian law. Disputes settled via arbitration in New Delhi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Miscellaneous</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Some clauses survive termination.</li>
            <li>Invalid provisions are severable.</li>
            <li>No waiver without written consent.</li>
            <li>Headings are for convenience only.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact & Account Deletion</h2>
          <p>
            For support, contact:{' '}
            <a href="mailto:care@AikamIndia.com" className="text-blue-600 underline">care@AikamIndia.com</a>.
            To delete your account, follow the app instructions under: <strong>Need Help → Profile → Delete Account</strong>.
          </p>
        </section>
      </motion.div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
