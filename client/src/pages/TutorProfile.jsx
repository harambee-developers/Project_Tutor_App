import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TutorProfile = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:7777/tutors');
        setTutors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 mt-12">Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => (
          <div key={tutor._id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <img src={tutor.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full mr-4" />
            <div>
              <div className="font-semibold">Email: {tutor.email}</div>
              <div className="font-semibold">Username: {tutor.username}</div>
              <div className="mt-2">
                <span className="font-semibold">Bio:</span> {tutor.profile.bio}
              </div>
              <div className="mt-2">
                <span className="font-semibold">Hourly Rate:</span> $ {tutor.profile.hourlyRate}
              </div>
              <div className="mt-3">
              <button class="bg-green-500 hover:bg-green-600 text-xs text-white font-bold py-2 px-3 rounded">
                Availability
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorProfile;
