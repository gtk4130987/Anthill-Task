import back from "../assets/login img.png"; // Ensure file name has no spaces

function Login() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <img className="w-full h-full object-cover absolute top-0 left-0" src={back} alt="Login Background" />

      {/* "Coming Soon" Text */}
      <h1 className="relative text-white text-4xl font-bold bg-black/50 px-6 py-3 rounded-lg shadow-lg">
        Coming Soon
      </h1>
    </div>
  );
}

export default Login;
