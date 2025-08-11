import React from "react";
import { StorageMode } from "../types";

interface StorageToggleProps {
  mode: StorageMode;
  onModeChange: (mode: StorageMode) => void;
}

export const StorageToggle: React.FC<StorageToggleProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
        <span className="text-sm font-medium text-gray-700">Storage Mode</span>
      </div>

      <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1">
        <button
          onClick={() => onModeChange("persistent")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            mode === "persistent"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          title="Notes persist between browser sessions"
        >
          Persistent
        </button>
        <button
          onClick={() => onModeChange("session")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            mode === "session"
              ? "bg-blue-500 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
          title="Notes are cleared when browser closes"
        >
          Session
        </button>
      </div>
    </div>
  );
};
