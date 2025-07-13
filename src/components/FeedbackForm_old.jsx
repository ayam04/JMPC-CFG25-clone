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
    <section className="min-h-screen flex items-center justify-center md-surface px-4 py-10 relative overflow-hidden">
      {/* Material 3 Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-primary-60/5 to-tertiary-60/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-secondary-60/5 to-primary-60/5 rounded-full blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="md-surface-container md-elevation-2 md-shape-corner-large p-8 w-full max-w-2xl relative z-10"
      >
        {/* Material 3 Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-6">
            <span className="text-2xl">💬</span>
            <span className="md-typescale-label-large md-text-on-surface font-medium">
              Share Your Experience
            </span>
          </div>
          
          <h2 className="md-typescale-headline-large md-text-on-surface font-bold text-center">
            <span className="bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent">
              Submit Your Feedback
            </span>
          </h2>
        </div>

        {/* Success animation */}
        {/* Material 3 Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 md-surface/90 flex items-center justify-center z-10 animate-fade-in md-shape-corner-large">
            <div className="flex flex-col items-center gap-4 md-surface-container-high md-elevation-3 p-8 md-shape-corner-large">
              <CheckCircle className="md-text-primary w-16 h-16" />
              <p className="md-typescale-title-large md-text-primary font-bold">
                Feedback Submitted Successfully!
              </p>
            </div>
          </div>
        )}

        {/* Material 3 User Type Toggle */}
        <div className="flex justify-center mb-8 gap-2">
          {["volunteer", "teacher"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`px-6 py-3 md-shape-corner-full md-typescale-label-large font-semibold transition-all duration-300 ${
                userType === type
                  ? "md-filled-button"
                  : "md-outlined-button"
              }`}
            >
              {type === "volunteer" ? "Volunteer" : "School Teacher"}
            </button>
          ))}
        </div>

        {/* Material 3 Input Fields */}
        <div className="grid gap-6 mb-8">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-4 md-shape-corner-small border border-outline focus:border-primary md-text-on-surface bg-surface-container-highest focus:outline-none transition-colors duration-200"
          />
            required
            className="p-4 md-shape-corner-small border border-outline focus:border-primary md-text-on-surface bg-surface-container-highest focus:outline-none transition-colors duration-200"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="p-4 md-shape-corner-small border border-outline focus:border-primary md-text-on-surface bg-surface-container-highest focus:outline-none transition-colors duration-200"
          />
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="School Name / Location"
            required
            className="p-4 md-shape-corner-small border border-outline focus:border-primary md-text-on-surface bg-surface-container-highest focus:outline-none transition-colors duration-200"
          />
        </div>

        {/* Material 3 Star Rating */}
        <div className="mb-8">
          <p className="md-typescale-title-medium md-text-on-surface font-medium mb-4">
            Rate Your Experience:
          </p>
          <div className="flex gap-2 justify-center">{[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
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
