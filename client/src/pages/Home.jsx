import React, { useContext, useEffect } from "react";
import { Products } from "../components/Products";
import { HeroSection } from "../components/HeroSection";
import { AppContext } from "../AppContext/Appcontext";
import { AboutSection } from "../components/AboutSection";
import { ReviewsSection } from "../components/ReviewSection";

const Home = () => {

  const {userdata} = useContext(AppContext)

  return (
    <>

      <section>
          <HeroSection />
      </section>
      <section id="all-products">
          <Products />
      </section>
      <section id="aboutus">
        <AboutSection/>
      </section>
       <section>
        <ReviewsSection/>
      </section>
      
    </>
  );
};

export default Home;
