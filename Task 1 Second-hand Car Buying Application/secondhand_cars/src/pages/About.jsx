import React from "react";
import car from "../assets/login img.png";
import speedometer from "../assets/speedometer.png";
import value from "../assets/1.png";
import team from "../assets/2.png";
import foot from "../assets/3.png";
import { FaCheckCircle, FaUsers, FaHandshake, FaTrophy } from "react-icons/fa";

// Data for Our Values
const values = [
  {
    icon: <FaCheckCircle />,
    title: "Integrity",
    desc: "We uphold the highest standards of integrity in all our actions.",
  },
  {
    icon: <FaUsers />,
    title: "Customer Commitment",
    desc: "We develop relationships that make a positive difference in our customers' lives.",
  },
  {
    icon: <FaHandshake />,
    title: "Teamwork",
    desc: "We work together, across boundaries, to meet the needs of our customers.",
  },
  {
    icon: <FaTrophy />,
    title: "Excellence",
    desc: "We strive to provide outstanding service that delivers premium value.",
  },
];

const About = () => {
  return (
    <main className="font-sans">
      {/* Hero Section */}
      <img style={{ width: "100%" }} src={car} alt="Hero" />

      {/* Our Journey Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-red-500 pl-3">
          Our Journey
        </h2>
        <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
          <p className="md:w-2/3 text-gray-600 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem odio ducimus, dolores excepturi aperiam quasi. Asperiores repudiandae iste similique rerum dolor odio in sint explicabo illum, quia ullam nesciunt possimus sequi illo obcaecati tempore neque dolorum laborum earum! Explicabo, assumenda. Ex impedit cupiditate voluptatibus recusandae dolores dicta nam repellendus cumque voluptatem mollitia excepturi, quaerat eum voluptatum architecto dignissimos numquam amet, enim dolore in alias placeat itaque tenetur! Aperiam suscipit voluptates et perspiciatis repellat sequi consequatur dolorum tempore adipisci cumque eius corrupti totam, dolores modi eligendi voluptas vel ipsam debitis quidem dignissimos deserunt accusamus iste iure earum! Distinctio tempora possimus eum atque incidunt perferendis esse aperiam consectetur, quo laudantium temporibus officia! Quisquam, sunt! Repellendus ea iusto sed commodi alias assumenda officiis.
          </p>
          <img
            style={{ borderRadius: "10px" }}
            src={speedometer}
            alt="Speedometer"
            className="w-1/3"
          />
        </div>

        {/* Stats */}
        <div className="mt-2 flex justify-center md:justify-start space-x-6">
          {[
            { value: "200+", label: "Happy Customers" },
            { value: "10k+", label: "Properties For Clients" },
            { value: "16+", label: "Years of Experience" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white p-6 shadow-md rounded-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <img src={value} alt="" />
      <img src={team} alt="" />
      <img src={foot} alt="" />



      
    </main>
  );
};

export default About;
