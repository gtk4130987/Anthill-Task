import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const user = auth.currentUser;
    if (user) {
      setUsername(user.email.split("@")[0]);
      setUserEmail(user.email);
    }

    fetchCars();
  }, []);

  const handleRequestCar = async (car) => {
    if (!userEmail) {
      alert("User email is not available. Please re-login.");
      return;
    }

    const confirmRequest = window.confirm(`Are you sure you want to request ${car.name}?`);
    if (!confirmRequest) return;

    await addDoc(collection(db, "requests"), {
      username,
      email: userEmail,
      carName: car.name,
      carImage: car.image,
      status: "Pending"
    });

    alert(`Request for ${car.name} has been sent successfully!`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br bg-blue-100 flex flex-col py-5 px-5">
      <div className="w-full max-w-full p-8 bg-blue-200 shadow-2xl rounded-lg">
      <div className="flex">
      <h2 className="text-5xl font-extrabold tracking-wide">
  <span className="text-blue-600 drop-shadow-md">Car</span>
  <span className="text-red-600 drop-shadow-md">space</span>
</h2>
<button
  onClick={() => auth.signOut().then(() => navigate("/user-login"))}
  className="ml-270 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-xl transition-all shadow-xl transform hover:scale-110"
>
  Logout
</button>
      </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-3 border-b pb-4">
          <h2 className="mt-10 text-4xl font-extrabold text-gray-800 tracking-wide">
            Welcome, <span className="text-blue-600">{username}!</span>
          </h2>
          
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="🔍 Search for a car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-full max-w-lg border rounded-lg shadow-md focus:ring-4 focus:ring-blue-400 transition duration-300 bg-gray-50 "
          />
        </div>

        {/* Car Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cars
            .filter((car) => car.name.toLowerCase().includes(search.toLowerCase()))
            .map((car) => (
              <div
                key={car.id}
                className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-56 object-cover rounded-xl mb-4 transition hover:opacity-90"
                />
                <h4 className="text-2xl font-bold text-gray-800">{car.name}</h4>
                <p className="text-lg text-gray-600 font-semibold">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">{car.description}</p>
                <button
                  onClick={() => handleRequestCar(car)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  🚗 Request to Buy
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
