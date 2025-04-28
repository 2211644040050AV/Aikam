import axios from "axios";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    pinCode: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/contactUs", formData);
      console.log("Form submitted successfully:", response.data);
      alert("Thank you! We will contact you soon!");
  
      // 🧹 Clear the form after successful submit
      setFormData({
        name: '',
        contactNo: '',
        pinCode: ''
      });
  
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="mt-10 lg:mt-0 px-4">
      <h3 className="text-center font-bold mb-4">
        अन्य किसी भी जानकारी के लिए ये फॉर्म भरें , हम आपसे 30 मिनट में संपर्क करेंगे
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b-2 border-black bg-transparent text-black py-1"
            required
          />
        </div>
        <div>
          <label className="block">Contact No.:</label>
          <input
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full border-b-2 border-black bg-transparent text-black py-1"
            required
          />
        </div>
        <div>
          <label className="block">Area Pin Code:</label>
          <input
            type="number"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            className="w-full border-b-2 border-black bg-transparent text-black py-1"
            required
          />
        </div>
        <button type="submit" className="bg-[#9A65C1] text-white py-2 px-6 rounded">
          Get in Touch
        </button>
      </form>
    </div>
  );
}
