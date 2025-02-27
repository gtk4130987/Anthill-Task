import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import carImage from "../assets/car-image.png";
import backgroundImage from "../assets/car-image.png"; // Ensure this path is correct

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { name, email, role: "user" });
      navigate("/user-login");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-black bg-opacity-60"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex w-[80%] max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img src={carImage} alt="Car" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8 relative">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <span className="text-blue-600">Car</span>
            <span className="text-red-600">space</span>
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full p-3 border rounded-lg"
              onChange={(e) => setName(e.target.value)}
            />
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
              className="bg-green-600 text-white w-full p-3 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?
              <button
                type="button"
                className="text-blue-600 underline ml-1"
                onClick={() => navigate("/user-login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
