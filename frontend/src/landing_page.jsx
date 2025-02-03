import { useState, useEffect } from "react";
import "./landing_page.css";
import LandingPageNavbar from "./landing_page_navbar";
import LandingPageFooter from "./landing_page_footer";

const LandingPage = () => {
  const [language, setLanguage] = useState(
    sessionStorage.getItem("language") || "en"
  );

  useEffect(() => {
    sessionStorage.setItem("language", language);
  }, [language]);

  const translations = {
    en: {
      titleData: "Everything That You Need to Know About Your Medicines",
      mainData:
        "Our web application leverages QR code technology to combat counterfeit drugs and manage medicine expiry dates, ensuring safer and more reliable medication practices. By scanning QR codes on medicine packaging, users can verify product authenticity against a secure database, access detailed expiry information, and receive automated alerts about expiring medications. The platform features bilingual support for seamless accessibility across diverse user groups and ensures data security with robust encryption and authentication. Designed for individuals, pharmacies, and healthcare facilities, this solution addresses critical healthcare challenges, reducing health risks and fostering trust in medication systems.",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How does the QR code verification work?",
          answer:
            "You can scan the QR code on the medicine package using our platform to verify its authenticity.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Yes, we use encryption to protect your personal and medical data.",
        },
        {
          question: "Can I use this service on mobile?",
          answer:
            "Yes, our web app is mobile-friendly and works on all devices.",
        },
        {
          question: "What happens if a medicine is counterfeit?",
          answer:
            "If a medicine is flagged as counterfeit, you will be notified immediately and advised not to use it.",
        },
        {
          question: "Can pharmacies use this service?",
          answer:
            "Yes, pharmacies can use our system to verify medicines before selling them.",
        },
        {
          question: "Does the system track expired medicines?",
          answer: "Yes, it sends alerts when medicines are about to expire.",
        },
        {
          question: "Do I need to create an account to use this service?",
          answer:
            "No, but creating an account provides additional benefits like personalized alerts.",
        },
        {
          question: "Is this service free?",
          answer:
            "Yes, basic features are free, but premium options may be available in the future.",
        },
        // {
        //   question: "Can I report a fake medicine?",
        //   answer:
        //     "Yes, you can report it through our system, and we will take appropriate action.",
        // },
        {
          question: "Does this service work worldwide?",
          answer:
            "Currently, it is available in select regions, but we are expanding.",
        },
        {
          question: "What devices are supported?",
          answer:
            "Our platform supports both Android and iOS devices, as well as desktops.",
        },
        // {
        //   question: "How frequently is the database updated?",
        //   answer:
        //     "We update our medicine database regularly to ensure accuracy.",
        // },
        // {
        //   question: "Can doctors use this system?",
        //   answer:
        //     "Yes, doctors can use it to verify medicine authenticity before prescribing.",
        // },
        {
          question: "What should I do if my medicine isn’t in the database?",
          answer:
            "You can give a feedback, and we will investigate and add it if necessary.",
        },
        {
          question: "How do I change the language of the application?",
          answer: "You can select your preferred language from the settings.",
        },
      ],
    },
    kn: {
      titleData: "ನಿಮ್ಮ ಔಷಧಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಬೇಕಾದ ಎಲ್ಲಾ ಮಾಹಿತಿಗಳು",
      mainData:
        "ನಮ್ಮ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ಕೃತಕ ಔಷಧಿಗಳ ವಿರುದ್ಧ ಹೋರಾಡಲು ಮತ್ತು ಔಷಧಿ ಅವಧಿ ಮುಗಿಯುವ ದಿನಾಂಕಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಔಷಧಿ ಅಭ್ಯಾಸಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಔಷಧಿ ಪ್ಯಾಕೇಜಿಂಗ್‌ನ ಮೇಲೆ ಕ್ಯೂಆರ್ ಕೋಡ್ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಮೂಲಕ, ಬಳಕೆದಾರರು ಸುರಕ್ಷಿತ ಡೇಟಾಬೇಸ್ ವಿರುದ್ಧ ಉತ್ಪನ್ನದ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು, ವಿಶ್ದೀರ್ಣ ಅವಧಿ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಬಹುದು, ಮತ್ತು ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ಔಷಧಿಗಳ ಬಗ್ಗೆ ಸ್ವಯಂಚಾಲಿತ ಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಬಹುದು.ಈ ವೇದಿಕೆ ವಿಭಿನ್ನ ಬಳಕೆದಾರ ಗುಂಪುಗಳಲ್ಲಿ ಸುಲಭ ಪ್ರವೇಶಕ್ಕಾಗಿ ದ್ವಿಭಾಷಾ ಬೆಂಬಲವನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಬಲವಾದ ಎನ್ಕ್ರಿಪ್ಷನ್ ಮತ್ತು ಪ್ರಮಾಣೀಕರಣದೊಂದಿಗೆ ಡೇಟಾ ಭದ್ರತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ವ್ಯಕ್ತಿಗಳು, ಫಾರ್ಮಸಿಗಳು, ಮತ್ತು ಆರೈಕೆ ಕೇಂದ್ರಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಈ ಪರಿಹಾರವು ಪ್ರಮುಖ ಆರೈಕೆ ಸವಾಲುಗಳನ್ನು ಪೂರೈಸಿ, ಆರೋಗ್ಯ ಅಪಾಯಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಮತ್ತು ಔಷಧಿ ವ್ಯವಸ್ಥೆಗಳ ಮೇಲೆ ವಿಶ್ವಾಸವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
      faqTitle: "ತರುವಾಯ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      faqs: [
        {
          question: "ಕ್ಯೂಆರ್ ಕೋಡ್ ಪರಿಶೀಲನೆ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
          answer:
            "ನೀವು ಔಷಧಿ ಪ್ಯಾಕೇಜಿಂಗ್‌ನಲ್ಲಿ ಕ್ಯೂಆರ್ ಕೋಡ್ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದು ಮತ್ತು ಉತ್ಪನ್ನದ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.",
        },
        {
          question: "ನನ್ನ ಡೇಟಾ ಸುರಕ್ಷಿತವೇ?",
          answer:
            "ಹೌದು, ನಾವು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ವೈದ್ಯಕೀಯ ಡೇಟಾವನ್ನು ರಕ್ಷಿಸಲು ಎನ್‌ಕ್ರಿಪ್ಷನ್ ಬಳಸುತ್ತೇವೆ.",
        },
        {
          question: "ಈ ಸೇವೆಯನ್ನು ಮೊಬೈಲ್‌ನಲ್ಲಿ ಬಳಸಬಹುದೇ?",
          answer:
            "ಹೌದು, ನಮ್ಮ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ಎಲ್ಲ ಸಾಧನಗಳಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.",
        },
        {
          question: "ಔಷಧಿ ಕೃತಕವಾದರೆ ಏನು?",
          answer:
            "ಔಷಧಿ ಕೃತಕ ಎಂದು ಪತ್ತೆಯಾದರೆ, ನಿಮ್ಮನ್ನು ತಕ್ಷಣವೇ ಮಾಹಿತಿ ನೀಡಲಾಗುತ್ತದೆ.",
        },
        {
          question: "ಫಾರ್ಮಸಿಗಳು ಈ ಸೇವೆಯನ್ನು ಬಳಸಬಹುದೇ?",
          answer:
            "ಹೌದು, ಫಾರ್ಮಸಿಗಳು ಮಾರಾಟಕ್ಕಿಂತ ಮೊದಲು ಔಷಧಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಈ ವ್ಯವಸ್ಥೆಯನ್ನು ಬಳಸಬಹುದು.",
        },
        {
          question: "ಈ ಪ್ಲ್ಯಾಟ್‌ಫಾರ್ಮ್ ಅವಧಿ ಮುಗಿಯುವ ಔಷಧಿಗಳನ್ನು ಗಮನಿಸುತ್ತದೆಯೇ?",
          answer:
            "ಹೌದು, ಅವಧಿ ಮುಗಿಯುವ ಔಷಧಿಗಳ ಬಗ್ಗೆ ಅಧಿಸೂಚನೆಗಳನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
        },
        {
          question: "ಈ ಸೇವೆಯನ್ನು ಬಳಸಲು ಖಾತೆ ಬೇಕಾ?",
          answer:
            "ಇಲ್ಲ, ಆದರೆ ಖಾತೆ ಹೊಂದುವುದರಿಂದ ವೈಯಕ್ತಿಕಗೊಂಡ ಅಧಿಸೂಚನೆಗಳು ಲಭ್ಯವಿರುತ್ತವೆ.",
        },
        {
          question: "ಈ ಸೇವೆ ಉಚಿತವೇ?",
          answer:
            "ಹೌದು, ಮೂಲಭೂತ ಸೌಲಭ್ಯಗಳು ಉಚಿತವಾಗಿವೆ, ಆದರೆ ಭವಿಷ್ಯದಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಆಯ್ಕೆಗಳು ಲಭ್ಯವಿರಬಹುದು.",
        },
        // {
        //   question: "ನಾನು ಕೃತಕ ಔಷಧಿಯನ್ನು ವರದಿ ಮಾಡಬಹುದೇ?",
        //   answer:
        //     "ಹೌದು, ನೀವು ನಮ್ಮ ವ್ಯವಸ್ಥೆಯ ಮೂಲಕ ವರದಿ ಮಾಡಬಹುದು, ಮತ್ತು ನಾವು ಸೂಕ್ತ ಕ್ರಮ ಕೈಗೊಳ್ಳುತ್ತೇವೆ.",
        // },
        {
          question: "ಈ ಸೇವೆ ವಿಶ್ವದಾದ್ಯಂತ ಲಭ್ಯವಿದೆಯೇ?",
          answer:
            "ಪ್ರಸ್ತುತ, ಇದು ಆಯ್ದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ, ಆದರೆ ನಾವು ವಿಸ್ತರಿಸುತ್ತಿದ್ದೇವೆ.",
        },
        {
          question: "ಯಾವ ಸಾಧನಗಳು ಬೆಂಬಲಿತವಾಗಿವೆ?",
          answer:
            "ನಮ್ಮ ವೇದಿಕೆ ಆಂಡ್ರಾಯ್ಡ್, ಐಒಎಸ್, ಮತ್ತು ಡೆಸ್ಕ್‌ಟಾಪ್ ಸಾಧನಗಳಿಗೆ ಬೆಂಬಲಿಸುತ್ತದೆ.",
        },
        // {
        //   question: "ಡೇಟಾಬೇಸ್ ಅನ್ನು ಎಷ್ಟು ಬಾರಿ ನವೀಕರಿಸಲಾಗುತ್ತದೆ?",
        //   answer: "ನಾವು ಔಷಧಿ ಡೇಟಾಬೇಸ್ ಅನ್ನು ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸುತ್ತೇವೆ.",
        // },
        // {
        //   question: "ವೈದ್ಯರು ಈ ವ್ಯವಸ್ಥೆಯನ್ನು ಬಳಸಬಹುದೇ?",
        //   answer: "ಹೌದು, ವೈದ್ಯರು ಔಷಧಿಯ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ಬಳಸಬಹುದು.",
        // },
        {
          question: "ನನ್ನ ಔಷಧಿ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಇಲ್ಲದಿದ್ದರೆ ಏನು ಮಾಡಬೇಕು?",
          answer:
            "ನೀವು ಅದನ್ನು ವರದಿ ಮಾಡಬಹುದು, ಮತ್ತು ನಾವು ಅದನ್ನು ಪರಿಶೀಲಿಸಿ ಸೇರಿಸುತ್ತೇವೆ.",
        },
        {
          question: "ನಾನು ಅಪ್ಲಿಕೇಶನ್‌ನ ಭಾಷೆಯನ್ನು ಹೇಗೆ ಬದಲಾಯಿಸಬಹುದು?",
          answer:
            "ನೀವು ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ನಿಮ್ಮ ಇಚ್ಛಿತ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಬಹುದು.",
        },
      ],
    },
  };

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <div className="home-container1">
        <LandingPageNavbar />
        <div className="home-banner-container1">
          {/* <div className="home-bannerImage-container1">
            <img src={"./home_landing_new.jpg"} alt="Home banner background" />
          </div> */}
          <div className="home-text-section1">
            <h1 className="primary-heading1">
              {translations[language].titleData}
            </h1>
            <p className="primary-text1">{translations[language].mainData}</p>
          </div>
        </div>

        <div className="faq-section">
          <h2>{translations[language].faqTitle}</h2>
          <div className="faq-container">
            {translations[language].faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <span className="faq-arrow">
                    {openFaq === index ? "▲" : "▼"}
                  </span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <LandingPageFooter />
    </>
  );
};

export default LandingPage;

// import React, { useState, useEffect } from "react";
// import "./landing_page.css";
// import LandingPageNavbar from "./landing_page_navbar";
// import LandingPageFooter from "./landing_page_footer";

// const LandingPage = () => {
//   // Check sessionStorage for the language, default to 'en' if not found
//   const [language, setLanguage] = useState(
//     sessionStorage.getItem("language") || "en"
//   );

//   useEffect(() => {
//     // Whenever the language changes, update the sessionStorage
//     sessionStorage.setItem("language", language);
//   }, [language]);

//   // Translations for different languages
//   const translations = {
//     en: {
//       titleData: "Everything That You Need to Know About Your Medicines",
//       mainData:
//         "Our web application leverages QR code technology to combat counterfeit drugs and manage medicine expiry dates, ensuring safer and more reliable medication practices. By scanning QR codes on medicine packaging, users can verify product authenticity against a secure database, access detailed expiry information, and receive automated alerts about expiring medications. The platform features bilingual support for seamless accessibility across diverse user groups and ensures data security with robust encryption and authentication. Designed for individuals, pharmacies, and healthcare facilities, this solution addresses critical healthcare challenges, reducing health risks and fostering trust in medication systems.",
//     },
//     kn: {
//       titleData: "ನಿಮ್ಮ ಔಷಧಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಬೇಕಾದ ಎಲ್ಲಾ ಮಾಹಿತಿಗಳು",
//       mainData:
//         "ನಮ್ಮ ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸಿಕೊಂಡು ಕೃತಕ ಔಷಧಿಗಳ ವಿರುದ್ಧ ಹೋರಾಡಲು ಮತ್ತು ಔಷಧಿ ಅವಧಿ ಮುಗಿಯುವ ದಿನಾಂಕಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ, ಇದರಿಂದ ಸುರಕ್ಷಿತ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ಔಷಧಿ ಅಭ್ಯಾಸಗಳನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಔಷಧಿ ಪ್ಯಾಕೇಜಿಂಗ್‌ನ ಮೇಲೆ ಕ್ಯೂಆರ್ ಕೋಡ್ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಮೂಲಕ, ಬಳಕೆದಾರರು ಸುರಕ್ಷಿತ ಡೇಟಾಬೇಸ್ ವಿರುದ್ಧ ಉತ್ಪನ್ನದ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು, ವಿಶ್ದೀರ್ಣ ಅವಧಿ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಬಹುದು, ಮತ್ತು ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ಔಷಧಿಗಳ ಬಗ್ಗೆ ಸ್ವಯಂಚಾಲಿತ ಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಬಹುದು.ಈ ವೇದಿಕೆ ವಿಭಿನ್ನ ಬಳಕೆದಾರ ಗುಂಪುಗಳಲ್ಲಿ ಸುಲಭ ಪ್ರವೇಶಕ್ಕಾಗಿ ದ್ವಿಭಾಷಾ ಬೆಂಬಲವನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಬಲವಾದ ಎನ್ಕ್ರಿಪ್ಷನ್ ಮತ್ತು ಪ್ರಮಾಣೀಕರಣದೊಂದಿಗೆ ಡೇಟಾ ಭದ್ರತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ವ್ಯಕ್ತಿಗಳು, ಫಾರ್ಮಸಿಗಳು, ಮತ್ತು ಆರೈಕೆ ಕೇಂದ್ರಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಈ ಪರಿಹಾರವು ಪ್ರಮುಖ ಆರೈಕೆ ಸವಾಲುಗಳನ್ನು ಪೂರೈಸಿ, ಆರೋಗ್ಯ ಅಪಾಯಗಳನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಮತ್ತು ಔಷಧಿ ವ್ಯವಸ್ಥೆಗಳ ಮೇಲೆ ವಿಶ್ವಾಸವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
//     },
//   };

//   return (
//     <>
//       <div className="home-container1">
//         {" "}
//         <LandingPageNavbar />
//         <div className="home-banner-container1">
//           <div className="home-bannerImage-container1">
//             <img
//               src={"./home-banner-background.png"}
//               alt="Home banner background"
//             />
//           </div>

//           <div className="home-text-section1">
//             <h1 className="primary-heading1">
//               {" "}
//               {translations[language].titleData}
//             </h1>
//             <p className="primary-text1"> {translations[language].mainData}</p>
//             <div className="home-image-container1">
//               <img
//                 src={"./home-banner-image.png"}
//                 alt="Banner Image"
//                 className="land-img-one"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <LandingPageFooter />
//     </>
//   );
// };

// export default LandingPage;
