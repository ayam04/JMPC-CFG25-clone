"use client";

import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";              // <- your Firebase init
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [role, setRole] = useState("user"); 
  const [form, setForm] = useState({ email: "", passwd: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (newRole) => setRole(newRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Map UI label “user” → Firestore value “volunteer”.
    const firestoreRole = role === "user" ? "volunteer" : "admin";

    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", form.email),
        where("password", "==", form.passwd),
        where("role", "==", firestoreRole)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        // ✅ Credentials & role match – redirect
        router.push(firestoreRole === "admin" ? "/admin" : "/schedule");
      } 
      else {
        setError("Invalid credentials or role");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
      >
        {/* Role toggle */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => handleRoleChange("user")}
            className={`px-4 py-2 rounded font-semibold transition ${
              role === "user"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("admin")}
            className={`px-4 py-2 rounded font-semibold transition ${
              role === "admin"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            Admin Login
          </button>
        </div>

        <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
          {role === "user" ? "User Login" : "Admin Login"}
        </h2>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="passwd"
            required
            value={form.passwd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded font-semibold transition ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
        >
          {loading ? "Checking..." : "Login"}
        </button>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </form>
    </section>
  );
};

export default LoginForm;
