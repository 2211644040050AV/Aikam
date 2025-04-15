import React from 'react';

export default function Service() {
    return (
        <section className="bg-white text-black w-5/5 py-4 px-4 lg:px-12 sm:py-2 rounded shadow">
            <h2 className="text-xl font-bold">
                Stay Healthy with <span className="text-[#9A65C1]">AIKAM INDIA</span>
            </h2>
            <p>AI Enabled Dark Store for all Medicines & healthcare needs.</p>
            <p><strong>About Us:</strong> AIKAM INDIA is a registered pharmacy based in Indiranagar, Lucknow...</p>
            <ul className="list-disc ml-6">
                <li>One call or WhatsApp message & medicines delivered with heavy discount</li>
                <li>ANY MEDICINE - Allopathic, Ayurvedic, Homeopathic, etc. at best prices</li>
                <li>Express delivery for OTC within 1 hour (Lucknow only)</li>
                <li>Delivery to any part of UP within 3 days</li>
            </ul>
            <p>Call or WhatsApp: <strong>9559604466</strong></p>
            <p>
                Visit:{" "}
                <a href="https://www.aikam.in/" className="text-[#9A65C1]" target="_blank" rel="noreferrer">
                    https://www.aikam.in/
                </a>
            </p>
        </section>
    );
}
