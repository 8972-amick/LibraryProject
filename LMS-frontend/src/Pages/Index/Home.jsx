import React from "react";
import { useNavigate } from "react-router-dom";
import {useOutletContext, } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate();
   const { filteredBooks } = useOutletContext();
  return (
    <div className="w-full h-84 bg-gray-900">
      <div className="bg-gray-900 text-white font-bold text-center text-4xl">
        Latest Books
      </div>

      <div className="grid grid-cols-3 gap-5 w-full p-4">
        <div className="bg-white text-black h-64 flex flex-col p-6">
          <div className=" pb-4 mr-45 flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">
              Simple
              <br />
              Lines
            </h2>
            <p className="text-gray-600 mb-6">Turn the page, open your mind</p>
            <button
              onClick={() => navigate("/book")}
              className="w-40 px-2 py-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition"
            >
              Explore now
            </button>
          </div>

          {/* RIGHT: Image Section */}
          <div className="ml-65 -mt-60">
            <img
              src="./src/assets/while justice sleeps.jpg"
              alt="Simple Lines"
              className="w-45 h-50 object-cover"
            />
          </div>
        </div>
        <div className="bg-white text-black h-64 flex flex-col p-6">
          <div className=" pb-4 mr-45 flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2">
              New
              <br />
              Books
            </h2>
            <p className="text-gray-600 mb-6">Books: reality is not enough.</p>
            <button
              onClick={() => navigate("/book")}
              className="w-40 px-2 py-2 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition"
            >
              Explore now
            </button>
          </div>

          {/* RIGHT: Image Section */}
          <div className="ml-65 -mt-60">
            <img
              src="./src/assets/things we lost in the water.jpg"
              alt="Simple Lines"
              className="w-45 h-50 object-cover"
            />
          </div>
        </div>

        <div className="bg-white text-black h-64 flex flex-col p-6">
          <div className=" ">
            <img
              src="./src/assets/The-Metamorphosis.jpg"
              alt="Simple Lines"
              className="w-100 pl-12 h-32 object-cover"
            />
          </div>
          <div className="text-center  w-full pt-6 mr-45 flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-2"> Summer Reads</h2>
            <p className="text-gray-600 mb-6">Discover. Imagine. Believe.</p>
          </div>
        </div>
      </div>
      <div className="">
        <h1 className="text-3xl text-center font-semibold p-4 mt-16">
          Our recommendations
        </h1>
      </div>

      <div className="grid grid-cols-6 gap-5 w-full p-2 ">
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/reminder of him.jpg"
            alt="Simple Lines"
            className="w-45 h-65 object-cover items-center"
          />
          <div>
            <h1 className="font-bold text-center">Reminder of Him</h1>
            <p className="text-center mb-2">Collen Hoover</p>

            <button className="px-2 py-1 ml-9 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Burrow
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/the murderclub.jpeg"
            alt="Simple Lines"
            className="w-45 h-65 object-cover"
          />
          <div>
            <h1 className="font-bold text-center">The Murder Club</h1>
            <p className="text-center mb-2">Richard Osman</p>

            <button className="px-2 py-1 ml-9 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Burrow
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/thank you for leaving.webp"
            alt="Simple Lines"
            className="w-45 h-65 object-cover"
          />
          <div>
            <h1 className="font-bold text-center">Thank you for leaving</h1>
            <p className="text-center mb-2">Rithvik singh</p>

            <button className="px-2 py-1 ml-10 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Borrow
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/it starts with us.png"
            alt="Simple Lines"
            className="w-45 h-65 object-cover"
          />
          <div>
            <h1 className="font-bold text-center">It Start With Us</h1>
            <p className="text-center mb-2">Collen Hoover</p>

            <button className="px-2 py-1 ml-6 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Burrow
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/it ends with us.jpeg"
            alt="Simple Lines"
            className="w-45 h-65 object-cover"
          />
          <div>
            <h1 className="font-bold text-center">It Ends With Us</h1>
            <p className="text-center mb-2">Collen Hoover</p>

            <button className="px-2 py-1 ml-6 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Burrow
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <img
            src="./src/assets/loved one.jpeg"
            alt="Simple Lines"
            className="w-45 h-65 object-cover"
          />
          <div>
            <h1 className="font-bold text-center">Loved one</h1>
            <p className="text-center mb-2">Aisha Muharrar</p>

            <button className="px-2 py-1 ml-6 border border-blue-400 text-blue-400 rounded hover:bg-blue-400 hover:text-white transition">
              Burrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
