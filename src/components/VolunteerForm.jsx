"use client";
import React, { useState } from "react";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    district: "",
    qualification: "",
    idFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleDeleteFile = () => {
    setFormData((prev) => ({
      ...prev,
      idFile: null,
    }));
    // Optionally reset the file input value
    document.getElementById("idFileInput").value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // All fields are required, so check for any missing
    if (
      !formData.name ||
      !formData.email ||
      !formData.number ||
      !formData.district ||
      !formData.qualification ||
      !formData.idFile
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Form submitted:", formData);
    // Submit logic goes here (e.g., send to backend)
  };

  return (
    <section className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-orange-600 text-center">
          Volunteer Registration Form
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="number"
            required
            value={formData.number}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            District <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="district"
            required
            value={formData.district}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Education Qualification <span className="text-red-500">*</span>
          </label>
          <select
            name="qualification"
            required
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>
              Select your qualification
            </option>
            <option value="High School">10th Grade</option>
            <option value="12th Grade">12th Grade</option>
            <option value="Diploma">Diploma</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload ID (PDF/Image) <span className="text-red-500">*</span>
          </label>
          <input
            id="idFileInput"
            type="file"
            name="idFile"
            accept=".jpg,.jpeg,.png,.pdf"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {formData.idFile && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-700 mr-3">
                {formData.idFile.name}
              </span>
              <button
                type="button"
                onClick={handleDeleteFile}
                className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 border border-red-200 rounded transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded font-semibold hover:bg-orange-700 transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default VolunteerForm;
