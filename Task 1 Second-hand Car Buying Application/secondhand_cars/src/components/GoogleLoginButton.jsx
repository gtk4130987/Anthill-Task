import React from "react";
import { signInWithGoogle } from "../firebase";

function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      alert(`Welcome, ${user.displayName}!`);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
    >
      <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
      Continue with Google
    </button>
  );
}

export default GoogleLoginButton;
