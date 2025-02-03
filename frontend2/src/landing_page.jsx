// import React from "react";
import "./landing_page.css";
import LandingPageNavbar from "./landing_page_navbar";
import LandingPageFooter from "./landing_page_footer";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context";
import axios from "axios";

const LandingPage = () => {
  const { lang } = useContext(GlobalContext);
  const [mainData, setMainData] = useState(
    "Our web application leverages QR code technology to combat counterfeit drugs and manage medicine expiry dates, ensuring safer and more reliable medication practices. By scanning QR codes on medicine packaging, users can verify product authenticity against a secure database, access detailed expiry information, and receive automated alerts about expiring medications. The platform features bilingual support for seamless accessibility across diverse user groups and ensures data security with robust encryption and authentication. Designed for individuals, pharmacies, and healthcare facilities, this solution addresses critical healthcare challenges, reducing health risks and fostering trust in medication systems."
  );

  const [titleData, setTitleData] = useState(
    "Everything That You Need to Know About Your medicines"
  );
  useEffect(() => {
    async function getKannadaText() {
      if (lang === "kannada") {
        console.log(JSON.stringify(mainData));

        try {
          const val = await axios.post("http://localhost:3000/translate", {
            text: JSON.stringify(mainData),
          });

          setMainData(val.data.translatedText);
        } catch (err) {
          console.log(err);
        }

        try {
          const val = await axios.post("http://localhost:3000/translate", {
            text: JSON.stringify(titleData),
          });

          setTitleData(val.data.translatedText);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getKannadaText();
  }, [lang]);
  return (
    <>
      <div className="home-container">
        {" "}
        <LandingPageNavbar />
        <div className="home-banner-container">
          <div className="home-bannerImage-container">
            <img
              src={"./home-banner-background.png"}
              alt="Home banner background"
            />
          </div>
          <div className="home-text-section">
            <h1 className="primary-heading">{titleData}</h1>
            <p className="primary-text">{mainData}</p>
            <div className="home-image-container">
              <img
                src={"./home-banner-image.png"}
                alt="Banner Image"
                className="land-img-one"
              />
            </div>
          </div>
        </div>
      </div>
      <LandingPageFooter />
    </>
  );
};

export default LandingPage;
