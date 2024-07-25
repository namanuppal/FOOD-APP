import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import a check circle icon

const CustomSuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-green-500 p-6 rounded shadow-lg max-w-sm mx-auto text-center">
        <FaCheckCircle size={50} className="text-white mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-white">Success</h2>
        <p className="mb-4 text-white">Sign up successful! Redirecting to sign in...</p>
        <button
          onClick={onClose}
          className="bg-white text-green-500 py-2 px-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomSuccessModal;
