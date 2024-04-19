import React from "react";
import SearchAndFilter from "../components/features/SearchAndFilter";
import heroImage from "../assets/hero-bg-2.jpg";
import aboutImage from "../assets/about-us-1.jpg";
import aboutImage2 from "../assets/about-us-2.jpg";

const Home = () => {
  return (
    <>
      {/* Hero us Section */}
      <section className="">
        <div
          className="bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="bg-gray-900 bg-opacity-50 min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ">
              <h1 className="text-4xl text-white font-semibold mb-4">
                Welcome to EduFire!
              </h1>
              <h2 className="text-xl text-white font-semibold mb-4">
                Ignite your education by finding your perfect tutor!
              </h2>
              <p className="text-sm text-white mb-8 text-center">
                Personalised learning experiences for every student
              </p>
              <form
                action="#"
                className="flex items-center justify-center space-x-4 w-1/2"
              >
                <SearchAndFilter />
              </form>
              <div className="flex justify-between items-center mt-8 gap-6">
                <button className="text-sm bg-teal-500 hover:bg-blue-700 text-white py-4 px-8 md:ml-4 md:text-base">
                  Get Started
                </button>
                <button className="text-sm bg-teal-500 hover:bg-blue-700 text-white py-4 px-8 md:ml-4 md:text-base">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>/
      </section>
      {/* About us Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
          <p className="text-sm text-gray-400 mb-8 text-center">
            Ignite your education by finding your perfect tutor!
          </p>
          <div className="w-full flex items-center mb-8">
            <div className="md:flex items-center">
              <img
                src={aboutImage}
                alt="Our Mission"
                className="mr-4 mb-4 rounded-lg md:ml-4"
              />
              <div>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  accusamus voluptatum a ratione fuga deserunt nihil
                  voluptatibus dolorem accusantium voluptates ipsam laboriosam
                  eligendi eum repudiandae, perspiciatis dignissimos ut corrupti
                  quas.
                </p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                  accusamus voluptatum a ratione fuga deserunt nihil
                  voluptatibus dolorem accusantium voluptates ipsam laboriosam
                  eligendi eum repudiandae, perspiciatis dignissimos ut corrupti
                  quas.
                </p>
              </div>
            </div>
          </div>
          <div className="py-16 bg-gray-100">
            <h2 className="text-3xl font-bold text-center mb-4">Our Vision and Mission</h2>
            <div className="w-full flex items-center mb-8">
              <div className="md:flex items-center">
                <img
                  src={aboutImage2}
                  alt="Our Vision"
                  className="mb-4 rounded-lg mr-4 md:ml-4"
                />
                <div>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias accusamus voluptatum a ratione fuga deserunt nihil
                    voluptatibus dolorem accusantium voluptates ipsam laboriosam
                    eligendi eum repudiandae, perspiciatis dignissimos ut
                    corrupti quas.
                  </p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias accusamus voluptatum a ratione fuga deserunt nihil
                    voluptatibus dolorem accusantium voluptates ipsam laboriosam
                    eligendi eum repudiandae, perspiciatis dignissimos ut
                    corrupti quas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
