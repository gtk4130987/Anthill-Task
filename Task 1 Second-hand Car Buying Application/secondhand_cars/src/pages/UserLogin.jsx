import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignInWithGoogle from "../components/GoogleLoginButton";
import carImage from "../assets/car-image.png"; // Ensure the path is correct
import bgImage from "../assets/car-image.png"; // Add a background image

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === "admin@email.com" && password === "190681") {
        navigate("/admin-dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay to add opacity */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Login Container */}
      <div className="relative z-10 flex w-[80%] max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section - Image */}
        <div className="w-1/2 hidden md:block">
          <img src={carImage} alt="Car" className="w-full h-full object-cover" />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8 relative">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-600">Car</span>
            <span className="text-red-600">space</span>
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your Email ID"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-600 text-white w-full p-3 rounded-lg hover:bg-red-700 transition">
              Login
            </button>
          </form>

          <SignInWithGoogle />

          <div className="mt-4 text-center">
            <p className="text-sm">
              New User?
              <button
                type="button"
                className="text-blue-600 underline ml-1"
                onClick={() => navigate("/register")}>
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
