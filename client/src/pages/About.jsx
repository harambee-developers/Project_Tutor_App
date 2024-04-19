import React from "react";
import aboutImage from "../assets/about-us-1.jpg";
import aboutImage2 from "../assets/about-us-2.jpg";

const About = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-4">
        Our Vision and Mission
      </h2>
      <div className="w-full flex items-center mb-8">
        <div className="md:flex items-center">
          <img
            src={aboutImage2}
            alt="Our Vision"
            className="mb-4 rounded-lg mr-4 md:ml-4"
          />
          <div>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              accusamus voluptatum a ratione fuga deserunt nihil voluptatibus
              dolorem accusantium voluptates ipsam laboriosam eligendi eum
              repudiandae, perspiciatis dignissimos ut corrupti quas.
            </p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              accusamus voluptatum a ratione fuga deserunt nihil voluptatibus
              dolorem accusantium voluptates ipsam laboriosam eligendi eum
              repudiandae, perspiciatis dignissimos ut corrupti quas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
