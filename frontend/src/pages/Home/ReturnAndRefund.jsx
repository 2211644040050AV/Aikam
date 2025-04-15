import React from 'react';
import { motion } from 'framer-motion';

const ReturnAndRefundPolicy = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="p-6 max-w-4xl mx-auto space-y-8 text-sm text-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Return & Refund Policy</h1>

        <section className="space-y-4">
          <p className="leading-relaxed">
            Purchased medicines can be returned within <span className="font-semibold">15 days</span> after the date of
            purchase, i.e., the date of invoice.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            Returned medicine will incur a <span className="font-semibold text-red-500">2.5% deduction</span> on the price paid to
            cover the expense of the return process.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            <span className="font-semibold">Non-returnable items:</span> General items, cold chain items, skincare, haircare, and
            dermatology-related products.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            The return amount will be <span className="font-semibold text-blue-600">refunded during the next purchase</span> from
            Aikam India.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            Products procured from a doctor’s clinic or hospital based on the respective prescription are{' '}
            <span className="font-semibold text-red-500">non-returnable</span>.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            Aikam India <span className="font-semibold">reserves the right</span> to decide which product/medicine is returnable or
            not.
          </p>
        </section>

        <section className="space-y-4">
          <p className="leading-relaxed">
            <span className="font-semibold text-red-500">Expired medicines</span> are strictly <span className="font-semibold">non-returnable</span>.
          </p>
        </section>
      </motion.div>
    </>
  );
};

export default ReturnAndRefundPolicy;
