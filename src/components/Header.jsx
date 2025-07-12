"use client";
import React from "react";
import Link from "next/link";

const Header = () => (
  <header
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "white",
      padding: "1rem 2.5rem",
      color: "#ff6600",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 1000,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <div className="flex items-center gap-4 font-bold text-2xl">
      <img
        src={"/logo.png"}
        alt="Logo"
        style={{ height: "56px", width: "56px", objectFit: "contain" }}
      />
      <h1>VigyanSaathi</h1>
    </div>

    <nav>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          padding: 0,
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <li>
          <a
            href="#about"
            style={{
              color: "#ff6600",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#impact"
            style={{
              color: "#ff6600",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Impact
          </a>
        </li>
        <li>
          <a
            href="#get-involved"
            style={{
              color: "#ff6600",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Get Involved
          </a>
        </li>
        <li>
          <Link href="/sign-in/a">
            <button
              style={{
                background: "#ff6600",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "0.7rem 1.3rem",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Login
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
