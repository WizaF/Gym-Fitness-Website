import React from "react";

export default function Errors({ errors }) {
  return (
    <>
      {errors.length > 0 && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>

          <ul className="mt-2">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>

          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <i className="fas fa-times"></i>
          </span>
        </div>
      )}
    </>
  );
}