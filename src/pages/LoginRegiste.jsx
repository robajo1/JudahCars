import React, { useState } from "react";

function LoginRegister() {
  const [isRegistering, setIsRegistering] = useState(false);
  var [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSeller: false,
  });

  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "", isSeller: false });
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
    if (!formData.email || !formData.password) {
      alert("Email and Password are required");
      return;
    }

    if (isRegistering) {
      if (!formData.fullName) {
        alert("Full Name is required");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }else{
      if(formData.isSeller){
        // Check if the user is a seller and handle accordingly
        alert("Seller login is not implemented yet.");
      }
      else{
        try {
          const response = await fetch("data/buyer.json");
          const data = await response.json();
        
          const matchedUser = data.find(
            (user) =>
              user.email === formData.email &&
              user.password === formData.password
          );
        
          if (!matchedUser) {
            alert("Invalid email or password");
          } else {
            formData = { ...matchedUser };
            localStorage.setItem("user", JSON.stringify(formData));
            alert("Login successful");
            window.location.href = "/";
          }
        }catch(e){
          console.error("Error logging in:", e);
          alert("Login failed. Please try again.");
        }
     
      }
      

    }

    // alert(`${isRegistering ? "Registered" : "Logged in"} as ${formData.isSeller ? "Seller" : "User"} successfully!`);
    // console.log("Form Data:", formData);
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
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {isRegistering && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        )}

        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="isSeller"
            checked={formData.isSeller}
            onChange={handleChange}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded"
          />
          <span>I am a seller</span>
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold"
        >
          {isRegistering ? "Sign Up" : "Login"}
        </button>
        <p className="text-center text-gray-600 text-sm">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
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
