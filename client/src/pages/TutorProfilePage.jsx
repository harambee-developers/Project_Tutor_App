import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/features/StarRating";
import io from "socket.io-client";
import InitialsCircle from "../data/initialsCircle";
import ShowMoreText from "../components/features/ShowMoreText";
import AvailabilityTable from "../components/features/AvailabilityTable";
import ChatModal from "../components/features/ChatModal";
import PaymentModal from "../components/features/PaymentModal";
import { useAuth } from "../components/features/AuthContext";
import SignUpModal from "../components/features/SignUpModal";
import { Helmet } from "react-helmet";
import favicon from "../../public/favicon.ico";
import "./TutorProfile.css";

// Connect to the WebSocket server
const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const TutorProfilePage = () => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { userId } = useParams();
  const { user: authUser } = useAuth();
  const [minRate, setMinRate] = useState(null);
  const [maxRate, setMaxRate] = useState(null);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${userId}`
        );
        setResults(response.data);
        if (response.data.profile?.subject?.length > 0) {
          const rates = response.data.profile.subject.map(
            (subject) => subject.price
          );
          setMinRate(Math.min(...rates));
          setMaxRate(Math.max(...rates));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/availability/${userId}`
        );
        // Adding checks and using optional chaining to safely access nested properties
        const availabilityData = response.data?.[0]?.days
          ? response.data[0].days.map((dayInfo) => ({
              day: dayInfo.day,
              times: dayInfo.times,
            }))
          : [];
        setAvailability(availabilityData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTutorData();
    fetchAvailability();
  }, [userId]);

  const [message, setMessage] = useState(
    `Hi! I’m looking for a tutor. Are you available for a free meeting? I’d like to find out more about how you work. I’m looking forward to your reply!`
  );

  const sendMessage = () => {
    if (message.trim()) {
      // Socket operations
      socket.emit("joinRoom", "Student");

      socket.emit("sendMessage", {
        senderId: authUser.username, // this should match the logged-in user's ID or something unique
        receiverId: userId, // Ensure this matches a receiver ID expected on the server
        content: message,
      });

      setMessage("");

      setIsModalOpen(false); // Close modal after sending
    }
  };

  const handleBooking = () => {
    if (!authUser?.username || authUser?.usertype !== "Student") {
      setShowSignUpModal(true); // Show modal if not authorized
    } else {
      setIsCheckoutModalOpen(true);
    }
  };

  const handleMessage = () => {
    if (!authUser?.username || authUser?.usertype !== "Student") {
      setShowSignUpModal(true); // Show modal if not authorized
    } else {
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  const hasReviews = results?.profile?.review;

  // Calculate the average rating
  const averageRating = hasReviews
    ? (
        results.profile.review.reduce((acc, review) => acc + review.rating, 0) /
        results.profile.review.length
      ).toFixed(1)
    : 0;

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <title>Harambee Tutors | {results.username} | Tutor Profile Page</title>
        <meta
          name="description"
          content={`${results.username}'s profile on Harambee Tutors. Connect with ${results.username} for personalized tutoring in various subjects and levels.`}
        />
        <meta
          name="keywords"
          content={`Harambee Tutors, ${results.username}, tutor profile, personalized tutoring, professional tutors, tutoring services`}
        />
        <meta name="author" content="Harambee Tutors" />
        <meta
          property="og:title"
          content={`Harambee Tutors | ${results.username} | Tutor Profile Page`}
        />
        <meta
          property="og:description"
          content={`Learn more about ${results.username}, a professional tutor on Harambee Tutors. Connect with ${results.username} for personalized tutoring services.`}
        />
        <meta property="og:image" content={favicon} />
        <meta property="og:url" content={import.meta.env.VITE_BACKEND_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Harambee Tutors | ${results.username} | Tutor Profile Page`}
        />
        <meta
          name="twitter:description"
          content={`${results.username}'s profile on Harambee Tutors. Connect with ${results.username} for personalized tutoring services.`}
        />
        <meta name="twitter:image" content={favicon} />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 flex flex-row items-center">
            <img
              src={results.avatarUrl}
              alt="image"
              className="h-32 w-32 md:h-48 md:w-48 object-cover rounded-full" // Added rounded-full for aesthetic if needed
            />
            <div className="ml-4 flex flex-col justify-center">
              <div className="uppercase tracking-wide text-sm text-gray-700 font-semibold">
                {results.username}
              </div>
              <div className="tracking-wide text-sm text-gray-700">
                <StarRating rating={averageRating} />
              </div>
              <div className="tracking-wide text-sm text-gray-700">
                {results.headline}
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold p-4">About me</h1>
            <div className="text-gray-600 px-4">
              <ShowMoreText text={results.profile.bio} limit={100} />
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h1 className="font-semibold text-xl py-4 px-4 border-b">
            Contact {results.username}
          </h1>
          {/* Grid setup for medium screens and larger */}
          <div className="flex flex-col md:flex-row p-4 md:mt-10">
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <p className="font-bold text-3xl text-gray-600">
                  £{minRate === maxRate ? minRate : `${minRate} - £${maxRate}`}
                </p>
                <p className="text-gray-600 ml-2 py-2">/ per hour</p>
              </div>
            </div>
          </div>
          {/* Full-width button section for all screen sizes, especially focused for medium and up */}
          <div className="px-4 py-6 space-y-4">
            <SignUpModal
              isOpen={showSignUpModal}
              onClose={() => setShowSignUpModal(false)}
              onSignUp={() => (window.location.href = "/register")} // Redirect to sign-up page
            />
            <PaymentModal
              isOpen={isCheckoutModalOpen}
              onRequestClose={() => setIsCheckoutModalOpen(false)}
              subjects={results.profile.subject}
              availability={availability}
              userId={userId}
            />
            <div className="fixed-bottom">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 w-full rounded-md transition duration-300 ease-in-out"
                onClick={handleBooking}
              >
                Book Now
              </button>
              <button
                className="mt-3 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 w-full rounded-md transition duration-300 ease-in-out"
                onClick={handleMessage}
              >
                Send Message
              </button>
            </div>
          </div>
          <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-lg font-semibold mb-4 px-4">Send a Message</h2>
            <textarea
              className="w-full p-4 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 w-full rounded-md transition duration-300 ease-in-out px-4"
              onClick={sendMessage}
            >
              Send
            </button>
          </ChatModal>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2">
          <h1 className="font-semibold text-xl p-4">Ratings and Reviews</h1>
          {hasReviews.length > 1 ? (
            <div>
              <span className="text-8xl px-4">{averageRating}</span>
              <div className="p-4 rounded-lg flex items-center gap-2">
                <StarRating rating={averageRating} />
                <p className="text-sm font-semibold">
                  {results.profile.review.length} Reviews
                </p>
              </div>
              <hr className="mb-5" />
              {results.profile.review.map((reviews, index) => (
                <div key={index} className="flex mb-5 px-5">
                  <InitialsCircle name={reviews.name} />
                  <div className="ml-5">
                    <h1 className="font-semibold text-sm px-4">
                      {reviews.name}
                    </h1>
                    <div className="p-4">
                      <StarRating rating={reviews.rating} />
                      <p>{reviews.description}</p>
                    </div>
                  </div>
                  <hr className="mb-5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              No reviews listed.
            </div>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 px-4">
          <h1 className="font-semibold text-xl py-4">Subjects Offered</h1>
          {results.profile?.subject?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Qualification
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.profile.subject.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {subject.subject}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {subject.qualification}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          £{subject.price}/hr
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-5 border-b border-gray-200 bg-white text-sm">
              No subjects listed.
            </div>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:col-span-2 px-4">
          <h1 className="font-semibold text-xl py-4">Availability</h1>
          <AvailabilityTable availability={availability} />
        </div>
      </div>
    </div>
  );
};

export default TutorProfilePage;
