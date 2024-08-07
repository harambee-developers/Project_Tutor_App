import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import defaultAvatarImage from "../assets/default_avatar.jpg";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import favicon from "../../public/favicon.ico";
import { countriesData } from "../data/Countries";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    usertype: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.confirmPassword)
      formErrors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.usertype) formErrors.usertype = "User type is required";
    if (!formData.gender) formErrors.usertype = "Gender is required";
    if (!formData.location) formErrors.location = "Please select location!";

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("usertype", formData.usertype);
    data.append("gender", formData.gender);
    data.append("location", formData.location);

    // Fetch the default avatar image and convert it to a Blob
    const response = await fetch(defaultAvatarImage);
    const blob = await response.blob();
    data.append("avatar", blob, "default_avatar.jpg");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      setIsSubmitting(false);

      if (response.ok) {
        alert("Registration successful!");
        // Handle successful registration (e.g., redirect to login page)
        navigate("/login");
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen border">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
        <title>Harambee Tutors | Sign Up</title>
        <meta
          name="description"
          content="Sign up for Harambee Tutors to access personalized tutoring services and connect with professional tutors for various subjects and levels."
        />
        <meta
          name="keywords"
          content="Harambee Tutors, sign up, register, tutoring services, personalized tutoring, professional tutors"
        />
        <meta name="author" content="Harambee Tutors" />
        <meta property="og:title" content="Harambee Tutors | Sign Up" />
        <meta
          property="og:description"
          content="Create your Harambee Tutors account to connect with professional tutors and manage your tutoring sessions."
        />
        <meta property="og:image" content={favicon} />
        <meta property="og:url" content={import.meta.env.VITE_BACKEND_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harambee Tutors | Sign Up" />
        <meta
          name="twitter:description"
          content="Sign up for Harambee Tutors to access personalized tutoring services and connect with professional tutors."
        />
        <meta name="twitter:image" content={favicon} />
      </Helmet>
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl flex justify-center text-center font-semibold gap-2 mb-4">
          <FaUser />
          Sign up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="username" className="block text-base mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username..."
              id="username"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="block text-base mb-2">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter email address..."
              id="email"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password..."
              id="password"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="confirmPassword" className="block text-base mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password..."
              id="confirmPassword"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="location" className="block text-base mb-2 mt-2">
              Location
            </label>
            <select
              name="location"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500 py-2"
              id="location"
              value={formData.location}
              onChange={handleChange}
              defaultValue={"default"}
            >
              <option value="default" disabled>Select location</option>
              {countriesData.map((item) => (
                <option key={item.code} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="gender" className="block text-base mb-2 mt-2">
              Gender
            </label>
            <select
              name="gender"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500 py-2"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              defaultValue={"default"}
            >
              <option value="default">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.usertype}</p>
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="usertype" className="block text-base mb-2 mt-2">
              User Type
            </label>
            <select
              name="usertype"
              className="border w-full text-base px-2 focus:outline-none focus:ring-0 focus:border-gray-500 py-2"
              id="usertype"
              value={formData.usertype}
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
            </select>
            {errors.usertype && (
              <p className="text-red-500 text-sm">{errors.usertype}</p>
            )}
          </div>
          <div className="mt-5">
            <button
              className={`border ${
                isSubmitting ? "bg-gray-500" : "bg-teal-500"
              } border-teal-700 text-white py-1 w-full rounded-md hover:bg-teal-700 font-semibold transition-all duration-300 ease-in-out`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
