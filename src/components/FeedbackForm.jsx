"use client";
import React, { useState } from "react";
import { Star, CheckCircle } from "lucide-react";

const FeedbackComponent = () => {
  const [userType, setUserType] = useState("volunteer");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        school: "",
        message: "",
      });
      setRating(0);
      setHoverRating(0);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // Animation visible for 3s
    }, 500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border border-orange-200 relative"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Submit Your Feedback
        </h2>

        {/* Success animation */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 animate-fade-in">
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="text-green-500" size={64} />
              <p className="text-green-600 font-semibold text-lg">
                Feedback Submitted!
              </p>
            </div>
          </div>
        )}

        {/* User Type Toggle */}
        <div className="flex justify-center mb-6 gap-4">
          {["volunteer", "teacher"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`px-5 py-2 rounded-full border font-semibold transition ${
                userType === type
                  ? "bg-orange-600 text-white"
                  : "border-orange-600 text-orange-600"
              }`}
            >
              {type === "volunteer" ? "Volunteer" : "School Teacher"}
            </button>
          ))}
        </div>

        {/* Input Fields */}
        <div className="grid gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="School Name / Location"
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-orange-600 font-medium mb-2">
            Rate Your Experience:
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition-transform duration-200 ${
                  (hoverRating || rating) >= star
                    ? "fill-orange-500 text-orange-500 scale-110"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feedback Text */}
        <div className="mb-6">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share your feedback..."
            required
            rows={4}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={showSuccess}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-semibold transition"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </section>
  );
};

export default FeedbackComponent;
