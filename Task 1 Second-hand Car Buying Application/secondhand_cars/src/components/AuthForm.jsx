import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import backgroundImage from "../assets/car-image.png"; 

function AuthForm() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert({ message: "", type: "" });
    }, 3000);
  };

  const provider = new GoogleAuthProvider();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        showAlert("Registered Successfully!", "success");
        navigate("/user-login");
      } else {
        if (formData.email === "admin@email.com" && formData.password === "190681") {
          showAlert("Admin Logged in Successfully!", "success");
          navigate("/admin-dashboard");
        } else {
          await signInWithEmailAndPassword(auth, formData.email, formData.password);
          showAlert("Logged in Successfully!", "success");
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      showAlert("Logged in Successfully with Google!", "success");
      navigate("/user-dashboard");
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: "rgba(0, 0, 0, 0.5)", backgroundBlendMode: "darken" }}
    >
      {/* Alert Message */}
      {alert.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white text-center max-w-md
            ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {alert.message}
        </div>
      )}

      {/* Modal Container with Fixed Size */}
      <div className="w-400 mx-auto flex max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg min-h-[550px]">
        
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <img src={backgroundImage} alt="Car" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 relative flex flex-col">
          
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
            onClick={() => navigate("/")}
          >
            <FiX size={20} />
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="text-blue-500">Car</span>
            <span className="text-red-500">space</span>
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <button
              className={`w-40 px-4 py-2 text-sm font-semibold transition-all ${
                !isRegister ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              } rounded-l-lg`}
              onClick={() => setIsRegister(false)}
            >
              Login
            </button>
            <button
              className={`w-40 px-4 py-2 text-sm font-semibold transition-all ${
                isRegister ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              } rounded-r-lg`}
              onClick={() => setIsRegister(true)}
            >
              Sign up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                value={formData.name}
                onChange={handleChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter your Email ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
            />
            {isRegister && (
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your Mobile Number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
                value={formData.mobile}
                onChange={handleChange}
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
              {isRegister ? "Sign up" : "Login"}
            </button>
          </form>

          {/* Google Sign-In Button */}
          {!isRegister && (
            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-lg flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition"
            >
              <img
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
