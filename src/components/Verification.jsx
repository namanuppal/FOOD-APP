import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Verification() {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await fetch(`https://api-production-9183.up.railway.app/auth/verify/${token}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Verification failed");
        }

        setMessage("Account verified successfully!");
        setIsSuccess(true);

        setTimeout(() => navigate("/signin"), 2000); // Redirect to sign-in after 2 seconds
      } catch (error) {
        setMessage(`Verification failed: ${error.message}`);
        setIsSuccess(false);
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Verify Your Account</h2>
        <p className={`mb-4 ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default Verification;
