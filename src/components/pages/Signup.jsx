import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useFormValidation } from "../../hooks/validationHook";
import { isEmpty } from "../../utils/helpers";
import { useShowToast } from "../../hooks/showToastHook";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  };

  const validationRules = {
    name: [
      {
        condition: (value) => value.trim() === "",
        message: "Name is required",
      },
    ],
    email: [
      {
        condition: (value) => !/^\S+@\S+\.\S+$/.test(value),
        message: "Invalid email address",
      },
    ],
    phone: [
      {
        condition: (value) => !/^\d{10}$/.test(value),
        message: "Invalid phone number (10 digits only)",
      },
    ],
    password: [
      {
        condition: (value) => value.length < 8,
        message: "Password must be at least 8 characters",
      },
      {
        condition: (value) => !/[A-Z]/.test(value),
        message: "Password must contain at least one uppercase letter",
      },
      {
        condition: (value) => !/[a-z]/.test(value),
        message: "Password must contain at least one lowercase letter",
      },
      {
        condition: (value) => !/\d/.test(value),
        message: "Password must contain at least one digit",
      },
      {
        condition: (value) => !/[!@#$%^&*()-=_+[\]{}|;:'",.<>/?\\]/.test(value),
        message: "Password must contain at least one special character",
      },
    ],
    cpassword: [
      {
        condition: (value, formData) => value !== formData?.password,
        message: "Passwords do not match!",
      },
    ],
  };

  const { formData, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validationRules
  );

  const showToast = useShowToast();
  const navigateTo = useNavigate();

  const handleSignup = async (data) => {
    const response = await fetch('http://127.0.0.1:5000/api/user/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        password: data.password.trim()
      })
    });

    if (response.status === 201) {
      const responseData = await response.json();
      showToast('success', responseData.message);
      navigateTo('/login');
    } else if (response.status === 400) {
      const responseData = await response.json();
      showToast('error', responseData.message);
    } else {
      showToast('error', "Something went wrong. Please contact admin");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loginBox bg-white opacity-90 p-8 rounded shadow-md w-[80%] sm:w-96">
        <h4 className="text-center mb-6 text-3xl font-semibold">Sign Up</h4>
        <form
          onSubmit={(e) => handleSubmit(e, handleSignup)}
          className="space-y-4"
        >
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              className="w-full p-2 border rounded"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {showPassword ? (
                <RiEyeOffLine onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
              ) : (
                <RiEyeLine onClick={() => setShowPassword(!showPassword)} className="cursor-pointer" />
              )}
            </div>
          </div>
          <input
            className="w-full p-2 border rounded"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.cpassword}
            onChange={handleChange}
            name="cpassword"
            required
          />
          
          {/* Render error messages */}
          {Object.entries(errors).map(([key, value]) => (
            <p key={key} className="text-sm text-red-500 mt-1">
              {value}
            </p>
          ))}
          
          <button
            type="submit"
            className={`w-full bg-teal-500 text-white p-2 rounded ${isEmpty(formData) || Object.values(errors).some((error) => error) ? 'cursor-not-allowed opacity-50' : 'hover:bg-teal-600'}`}
            disabled={isEmpty(formData) || Object.values(errors).some((error) => error)}
          >
            Sign Up
          </button>
          <div className="text-gray-600">
            <span className="mr-1">Already a user?</span>
            <Link to="/login" className="text-teal-500 text-decoration-none">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
