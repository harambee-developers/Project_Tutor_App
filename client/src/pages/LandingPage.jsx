import React from 'react';
import { useNavigate } from 'react-router-dom';
import herobackground from '../assets/herobackground.jpg';

function LandingPage() {
  const navigate = useNavigate();

  const handleFindTutors = () => {
    navigate('/'); // Modify this to the correct route if it should go somewhere else
  };

  const handleStartSearchNow = () => {
    navigate('/register');
  };

  return (
    <div className="text-center">
      <section
        className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${herobackground})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-4 md:px-0">
          <h2 className="text-4xl md:text-6xl font-bold">
            Connecting You with the Best Tutors Nearby
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Find experienced tutors to help you excel in your studies.
          </p>
          <button
            onClick={handleFindTutors}
            className="mt-6 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
          >
            Find a Tutor
          </button>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <h3 className="text-3xl font-semibold mb-8">Why Choose Us?</h3>
        <div className="flex flex-row justify-between items-center w-full max-w-6xl mx-auto space-x-8">
          <div className="flex flex-col items-center text-center">
            <i className="fas fa-chalkboard-teacher text-green-600 text-4xl mb-4"></i>
            <span className="text-xl font-bold">Experienced and Verified Tutors</span>
            <p className="mt-2">All our tutors are highly qualified and have been verified.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <i className="fas fa-calendar-alt text-green-600 text-4xl mb-4"></i>
            <span className="text-xl font-bold">Flexible Scheduling</span>
            <p className="mt-2">Choose a time that works best for your busy schedule.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <i className="fas fa-dollar-sign text-green-600 text-4xl mb-4"></i>
            <span className="text-xl font-bold">Affordable Rates</span>
            <p className="mt-2">We offer competitive pricing for all our tutoring services.</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h3 className="text-3xl font-semibold mb-8">How It Works</h3>
        <div className="flex flex-row justify-between items-center w-full max-w-6xl mx-auto space-x-8">
          <div className="text-center flex flex-col items-center">
            <i className="fas fa-search text-green-600 text-4xl mb-4"></i>
            <h4 className="text-xl font-bold">Search for Tutors</h4>
            <p className="mt-2">Use our search tool to find tutors in your area.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <i className="fas fa-users text-green-600 text-4xl mb-4"></i>
            <h4 className="text-xl font-bold">Compare Profiles and Reviews</h4>
            <p className="mt-2">Read reviews and choose the best tutor for you.</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <i className="fas fa-calendar-check text-green-600 text-4xl mb-4"></i>
            <h4 className="text-xl font-bold">Book a Session</h4>
            <p className="mt-2">Schedule a session at your convenience.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <button
          onClick={handleStartSearchNow}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded"
        >
          Start Your Search Now
        </button>
      </section>
    </div>
  );
}

export default LandingPage;
