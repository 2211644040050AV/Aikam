import React from 'react'

export default function ContactForm() {
  return (
    <div>
      <div className="mt-10 lg:mt-0 px-4">
        <h3 className="text-center font-bold mb-4">
          अन्य किसी भी जानकारी के लिए ये फॉर्म भरें , हम आपसे 30 मिनट में संपर्क करेंगे
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              className="w-full border-b-2 border-black bg-transparent text-black py-1"
              required
            />
          </div>
          <div>
            <label className="block">Contact No.:</label>
            <input
              type="number"
              name="contact"
              className="w-full border-b-2 border-black bg-transparent text-black py-1"
              required
            />
          </div>
          <div>
            <label className="block">Area Pin Code:</label>
            <input
              type="number"
              name="pincode"
              className="w-full border-b-2 border-black bg-transparent text-black py-1"
              required
            />
          </div>
          <button type="submit" className="bg-[#9A65C1] text-white py-2 px-6 rounded">
            Get in Touch
          </button>
        </form>
      </div>
    </div>
  )
}
