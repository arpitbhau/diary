// Jai Shree Ram
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-center border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">{message}</h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-full shadow-md transition-all duration-150"
          >
            <CheckCircle className="w-5 h-5" />
            Accept
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-full shadow-md transition-all duration-150"
          >
            <XCircle className="w-5 h-5" />
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
