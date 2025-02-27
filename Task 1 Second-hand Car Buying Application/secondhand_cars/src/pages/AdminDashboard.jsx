import { auth, db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedSection, setSelectedSection] = useState("manage");
  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carImage, setCarImage] = useState("");
  const [carDescription, setCarDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCars(carsData);
    };

    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsData);
    };

    fetchCars();
    fetchRequests();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/user-login");
  };

  const handleAddOrUpdateCar = async () => {
    if (!carName || !carPrice || !carImage || !carDescription) {
      alert("Please fill in all fields.");
      return;
    }

    if (editId) {
      const carRef = doc(db, "cars", editId);
      await updateDoc(carRef, { name: carName, price: carPrice, image: carImage, description: carDescription });

      setCars(cars.map(car => (car.id === editId ? { id: editId, name: carName, price: carPrice, image: carImage, description: carDescription } : car)));
      setEditId(null);
    } else {
      const docRef = await addDoc(collection(db, "cars"), { name: carName, price: carPrice, image: carImage, description: carDescription });
      setCars([...cars, { id: docRef.id, name: carName, price: carPrice, image: carImage, description: carDescription }]);
    }

    setCarName("");
    setCarPrice("");
    setCarImage("");
    setCarDescription("");
  };

  const handleEditCar = (car) => {
    setCarName(car.name);
    setCarPrice(car.price);
    setCarImage(car.image);
    setCarDescription(car.description);
    setEditId(car.id);
  };

  const handleDeleteCar = async (carId) => {
    await deleteDoc(doc(db, "cars", carId));
    setCars(cars.filter(car => car.id !== carId));
  };

  const handleDeleteRequest = async (requestId) => {
    await deleteDoc(doc(db, "requests", requestId));
    setRequests(requests.filter(req => req.id !== requestId));
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gr-900 text-white flex flex-col p-6 fixed h-full">
        <h2 className="m-2 text-3xl font-bold text-center mb-6 ml-0 ">
          <span className="text-blue-500">Car</span>
          <span className="text-red-500">space</span>
        </h2>
        <button onClick={() => setSelectedSection("manage")} className="mb-4 bg-blue-500 px-4 py-2 rounded">Manage Cars</button>
        <button onClick={() => setSelectedSection("requests")} className="mb-4 bg-red-500 px-4 py-2 rounded">View Requests</button>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 ml-[20%] p-10 bg-blue-100 min-h-screen">
        {selectedSection === "manage" ? (
          <div>
          <h2 className="mb-5 text-4xl font-extrabold text-gray-800 tracking-wide">
          Welcome, <span className="text-blue-600">Admin!</span>
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-200 flex gap-6">
  <div className="flex-1">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
      {editId ? "Update Car Details" : "Add a New Car"}
    </h2>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Car Name"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="Car Price"
        value={carPrice}
        onChange={(e) => setCarPrice(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <textarea
        placeholder="Car Description"
        value={carDescription}
        onChange={(e) => setCarDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        rows="3"
      ></textarea>
      <input
        type="text"
        placeholder="Image URL"
        value={carImage}
        onChange={(e) => setCarImage(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={handleAddOrUpdateCar}
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-3 rounded-lg shadow-md"
      >
        {editId ? "Update Car" : "Add Car"}
      </button>
    </div>
  </div>

  {/* Image Preview - Only visible when URL is provided */}
  <div className="w-1/3 flex items-center justify-center">
    {carImage ? (
      <div className="w-full overflow-hidden rounded-lg shadow-md border border-gray-300">
        <img
          src={carImage}
          alt="Car Preview"
          className="w-full h-48 object-cover"
        />
      </div>
    ) : (
      <div className="w-full h-48 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100">
        <span className="text-gray-400">No Image</span>
      </div>
    )}
  </div>
</div>


      
            
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-40 object-cover mb-3 rounded-lg"
          />
          <h4 className="text-lg font-bold text-gray-800">{car.name}</h4>
          <p className="text-gray-700 font-medium">${car.price}</p>
          <p className="text-gray-600 text-sm mb-3">{car.description}</p>
          <div className="flex justify-between">
            <button
              onClick={() => handleEditCar(car)}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 transition-all text-white px-4 py-2 rounded-lg shadow-md"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDeleteCar(car.id)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-lg shadow-md"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    

          </div>
        ) : selectedSection === "requests" ? (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Purchase Requests</h3>
            {requests.length === 0 ? (
              <p>No requests found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Request from: {req.email}</h4>
                      <p className="text-gray-700">User Name: {req.username}</p>
                      <p className="text-gray-600">Car: {req.carName}</p>
                      <div className="mt-2 flex space-x-5">
                         <button 
                            onClick={() => handleDeleteRequest(req.id)} 
                            className="bg-red-500 text-white px-6 py-2 rounded w-45"
                         >
                          Delete Request
                         </button>
                        <button 
                           className="bg-green-500 text-white px-6 py-2 rounded w-45"
                        >
                           Approve
                        </button>
                      </div>
                    </div>
                    <img src={req.carImage} alt={req.carName} className="w-24 h-24 object-cover rounded" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
