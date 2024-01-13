import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { isEmpty } from "../../utils/helpers";
import { useShowToast } from "../../hooks/showToastHook";
import { useFormValidation } from "../../hooks/validationHook";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const initialState = {
    user: "",
    password: ""
  };

  const validationRules = {
    user: [
      {
        condition: (value) => value.trim().length < 3,
        message: "Invalid username or email"
      }
    ],
    password: [
      {
        condition: (value) => value.length === 0,
        message: "Password is required"
      }
    ],
  };

  const { formData, errors, handleChange, handleSubmit } = useFormValidation(initialState, validationRules)

  const showToast = useShowToast();
  const navigateTo = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/user/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: data.user.trim(), password: data.password.trim() })
    });

    if (response.status === 200) {
      const responseData = await response.json();
      showToast('success', responseData.message);

      const token = responseData.token;
      localStorage.setItem('token', token);
      navigateTo('/');
    } else if ([400, 401, 404].includes(response.status)) {
      const responseData = await response.json();
      showToast('error', responseData.message);
    } else {
      showToast('error', "Something went wrong. Please contact admin");
    }
    } catch (error) {
      console.log(error?.message)
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="bg-white opacity-90 p-8 rounded shadow-md w-[80%] sm:w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={(e) => handleSubmit(e, handleLogin)} className="space-y-4">
          <div>
            <label htmlFor="user" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              autoComplete
              type="email"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className={`mt-1 p-2 w-full rounded border ${errors.user ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.user && <p className="text-sm text-red-500 mt-1">{errors.user}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                autoComplete
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 p-2 w-full rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-teal-500 text-white p-2 rounded ${isEmpty(formData) ? 'cursor-not-allowed opacity-50' : 'hover:bg-teal-600'}`}
            disabled={isEmpty(formData)}
          >
            Login
          </button>

          <div className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-teal-500">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
