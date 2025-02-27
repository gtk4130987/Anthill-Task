import { useState } from "react";

function HomeContainer() {
  const [selectedTab, setSelectedTab] = useState("new");

  return (
    <div className="absolute right-20 top-1/4 bg-white p-6 rounded-lg shadow-lg w-96">
      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 p-1 rounded-full">
        <button
          className={`flex-1 text-lg font-semibold py-2 rounded-full ${
            selectedTab === "new"
              ? "bg-white shadow text-black"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("new")}
        >
          New Cars
        </button>
        <button
          className={`flex-1 text-lg font-semibold py-2 rounded-full ${
            selectedTab === "used"
              ? "bg-white shadow text-black"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("used")}
        >
          Used Cars
        </button>
      </div>

      {/* Form Inputs */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Make"
          className="w-full p-3 border rounded-md mt-2 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Models"
          className="w-full p-3 border rounded-md mt-2 bg-gray-100"
        />

        {/* Price Range Slider */}
        <div className="mt-4">
          <input type="range" min="1000" max="5000" className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>1,000</span>
            <span>5,000</span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Body"
          className="w-full p-3 border rounded-md mt-2 bg-gray-100"
        />

        {/* Search Button */}
        <button className="mt-6 w-full bg-red-500 text-white py-3 rounded-full text-lg font-semibold">
          2334 Cars
        </button>
      </div>
    </div>
  );
}

export default HomeContainer;
