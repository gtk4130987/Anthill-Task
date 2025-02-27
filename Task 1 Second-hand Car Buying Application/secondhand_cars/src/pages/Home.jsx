import backgroundImage from "../assets/home-background.png";
import HomeContainer from "../components/HomeContainer";
import {  db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import foot from "../assets/3.png";

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        if (isMounted) {
          setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Background Section */}
      <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <img
        src={backgroundImage}
        alt="Cars background"
        className="w-full h-screen object-cover"
      />

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-12">
        <h1 className="text-white text-5xl font-bold max-w-xl">
          Find Quality-Assured Cars Tailored to Your Budget and Preferences
        </h1>
        <p className="text-white mt-4">
          Browse a Wide Range of Certified Used Cars from Trusted Dealers and Private Sellers
        </p>

        <button className="w-40 mt-6 bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold">
          Book My Car
        </button>

        {/* Star Rating */}
        <div className="flex items-center mt-4 text-yellow-400">
          <span className="text-lg">★★★★★</span>
          <span className="text-white text-sm ml-2">Working with 50+ Happy members</span>
        </div>
      </div>

      {/* Car Search Component */}
      <HomeContainer />
    </div>

      {/* Car Listings Section Below Background */}
      <div className="p-8 bg-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Available Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              {car.image && (
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover rounded-xl mb-4 transition hover:opacity-90"
                />
              )}
              <h4 className="text-2xl font-bold text-gray-800">{car.name}</h4>
              <p className="text-lg text-gray-600 font-semibold">
                ${car.price ? car.price.toLocaleString() : "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-1">{car.description || "No description available."}</p>
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                🚗 view Details
              </button>
            </div>
          ))}
        </div>
        <img src={foot} alt="" />
      </div>
    </div>
  );
}

export default Home;
