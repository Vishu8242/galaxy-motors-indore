import React from "react";
import Hero from "./Hero";
import Inventory from "./Inventory";
import About from "./About";
import Contact from "./Contact";

function First() {
  return (
    <>
      {/* HOME SECTION */}
      <div id="home">
        <Hero />
      </div>

      {/* INVENTORY SECTION (SCROLL TARGET) */}
      <div id="inventory">
        <Inventory />
      </div>
       <div id="about">
        <About />
      </div>
       <div id="contact">
        <Contact />
      </div>
      
    </>
  );
}

export default First;
