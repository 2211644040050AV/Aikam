import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import sanket from '../../assets/CustomersFeedback/sanket.jpg';
import prateek from '../../assets/CustomersFeedback/prateek.jpg';
import harshita from '../../assets/CustomersFeedback/harshita.jpg';
import pushpa from '../../assets/CustomersFeedback/pushpa.jpg';

export default function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    const TestimonialsData = [
        {
            name: "संकेत चौबे (यस बैंक)",
            location: "गोमती नगर, लखनऊ",
            image: sanket,
            testimonial: "एकम की रिमाइंडर सर्विस बहुत अच्छी लगी | दवाई ख़तम होने के 7 दिन पहले एकम से कॉल आ जाता है | पहले कई बार दवाई खाने में गैप हो जाता था | अब कोई टेंशन नहीं है |",
        },
        {
            name: "प्रतीक चौबे (मेडिकल कॉलेज)",
            location: "गोमती नगर, लखनऊ, उत्तर प्रदेश",
            image: prateek,
            testimonial: "मेरी सारी दवाई किसी भी ऑनलाइन वेबसाइट पे नहीं मिल रही थी | एकम से मुझे सभी दवाएं मिल गयीं और डिस्काउंट भी मिला घर बैठे बैठे",
        },
        {
            name: "Harshit Sharma (Student)",
            location: "Rajajipuram, Lucknow, Uttar Pradesh",
            image: harshita,
            testimonial: "Amazing experience ... The service of aikam is best ... They deliver medicines on time and on huge discount ... I placed my order in morning and within 4 to 5 hrs they delivered medicines very well ... And the amazing part is ... Free delivery. Thank you aikam team!",
        },
        {
            name: "पुष्पा वर्मा (गृहिणी)",
            location: "इंदिरा नगर, लखनऊ, उत्तर प्रदेश",
            image: pushpa,
            testimonial: "पहले दवाएं ढूंढ़ने में बहुत दिक्कत होती थी क्यूंकि वो दवाएं सिर्फ डॉक्टर साहब के क्लिनिक पे मिलती थीं और वहां डिस्काउंट तो मिलता ही नहीं था | एकम से अब सभी दवाएं घर पे आ जाती हैं वो भी अच्छे डिस्काउंट पे | समय और पैसा भी बचता है और दवाएं ढूंढ़ने का झंझट भी नहीं |",
        },
    ];

    return (
        <section className="bg-gray-200 text-black py-8 px-4 lg:px-8 rounded-lg shadow">
            <h2 className="text-center text-[#9A65C1] text-2xl font-bold mb-8">
                What our Customers Say
            </h2>
            
            <Slider {...settings}>
                {TestimonialsData.map((item, index) => (
                    <div key={index} className="px-4">
                        <div className="bg-white p-4 h-80 rounded-lg shadow-md text-center max-w-xl mx-auto">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-full mx-auto object-cover"
                            />
                            <h4 className="text-lg font-semibold mt-4">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <hr className="my-3 w-1/2 mx-auto border-gray-300" />
                            <p className="text-sm">{item.testimonial}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
