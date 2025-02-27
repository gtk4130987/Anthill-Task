import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  // eslint-disable-next-line no-undef
  const [email, setEmail] = useState("null");
  // eslint-disable-next-line no-undef
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!", { position: "top-center" });
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Email or Password!", { position: "bottom-center" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!", { position: "top-center" });
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h3>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Login</button>
        </form>

        <button onClick={handleGoogleSignIn} className="w-full bg-gray-100 border py-2 rounded-md shadow-sm hover:bg-gray-200 mt-4">Continue with Google</button>

        <p className="text-center mt-4">New user? <a href="/register" className="text-indigo-600">Register here</a></p>
      </div>
    </div>
  );
}

export default Login;
