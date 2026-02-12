// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaGraduationCap, FaSpinner } from 'react-icons/fa';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setIsSubmitting(true);

//         // Simulate network delay for better UX feel or just await directly
//         const result = await login(email, password);

//         if (result.success) {
//             navigate('/');
//         } else {
//             setError(result.error);
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="flex justify-center text-primary-600">
//                     <FaGraduationCap size={48} />
//                 </div>
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Sign in to your account
//                 </h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                     Or{' '}
//                     <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
//                         create a new account
//                     </Link>
//                 </p>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         {error && (
//                             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
//                                 <span className="block sm:inline">{error}</span>
//                             </div>
//                         )}

//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email address
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <div className="mt-1">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     autoComplete="current-password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSubmitting ? (
//                                     <FaSpinner className="animate-spin h-5 w-5" />
//                                 ) : (
//                                     'Sign in'
//                                 )}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


// ---------------------------------------------------------------------------------------------------
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaGraduationCap, FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-200 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 text-white p-4 rounded-full">
              <FaGraduationCap size={28} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome back 👋
          </h2>
          <p className="text-center text-gray-500 text-sm mt-1">
            Login to continue learning
          </p>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-all flex items-center justify-center"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
