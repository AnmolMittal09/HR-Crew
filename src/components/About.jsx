import React from "react";
import OwnerCard from "./OwnerCard";
import AnmolImg from "../assets/anmol.jpg";
import HarshImg from "../assets/harsh.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800 text-center">
      <h2 className="text-4xl font-bold mb-10">About Us</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        <OwnerCard img={AnmolImg} name="Anmol Mittal" role="Co-founder & Music Producer" />
        <OwnerCard img={HarshImg} name="Harsh Goyal" role="Co-founder & Studio Manager" delay={0.3} />
      </div>
    </section>
  );
};

export default About;
