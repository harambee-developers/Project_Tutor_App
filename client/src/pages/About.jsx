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
            <p className="text-gray-700 mb-4">
             At EduFire, our vision is to revolutionise local education by empowering students to ignite
             their potential through tailored, one-on-one tutoring. We strive to make quality education
              accessible to every student, fostering a community where knowledge and learning flourish.
            </p>
            <p className="text-gray-700">
               Our mission is to create a seamless connection between students and tutors
               within their own communities. By leveraging cutting-edge technology and a 
               comprehensive vetting process, we ensure that every student finds a tutor 
               who not only meets their academic needs but also matches their learning 
               style and personality. We are committed to helping students excel academically
               and develop lifelong learning skills in a supportive and engaging environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
