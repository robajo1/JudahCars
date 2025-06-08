import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "SELLER", // default role
  });

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      role: "BUYER",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Basic validation
    if (isRegistering) {
      if (!formData.phone.startsWith("09") && !formData.phone.startsWith("07")) {
        alert("Enter valid Phone Number (09XXXXXXXX) or (07XXXXXXXX)");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }


      try {
        const response = await fetch("http://localhost:9090/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email.toLowerCase(),
            password: formData.password,
            role: formData.role,
            phone: formData.phone,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Registration failed");
        } else {
          alert("Registration successful. Please log in.");
          setIsRegistering(false);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            role: "BUYER",
          });
        }
      } catch (e) {
        console.error("Error registering:", e);
        alert("Registration failed. Please try again.");
      }
    } else {
      try {
        const response = await fetch("http://localhost:9090/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Invalid email or password");
        } else {
          console.log("Login successful:", data);
          console.log("Response headers:", [...response.headers]);
          const token = response.headers.get("Authorization")?.replace("Bearer ", "");

          if (token) {
            localStorage.setItem("jwt_token", token); 
            localStorage.setItem("user", JSON.stringify(data)); 
            alert("Login successful");
            navigate("/");
          } else {
            alert("Login failed: No token received");
          }
        }
      } catch (e) {
        console.error("Error logging in:", e);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {isRegistering ? "Create an Account" : "Welcome Back"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        {isRegistering && (
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {isRegistering && (
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            maxLength={10}
            required
            minLength={10}
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={4}
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {isRegistering && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
            </select>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
        >
          {isRegistering ? "Sign Up" : "Login"}
        </button>
        <p className="text-center text-gray-600 text-sm">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleForm}
            className="text-purple-600 hover:underline ml-1"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginRegister;