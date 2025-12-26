import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been submitted successfully!");

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="h-full w-full">
      <div className="relative bg-gradient-to-r from-blue-300 to-blue-500 w-full h-[400px]">
        <h1 className="font-bold text-5xl pl-8 text-white items-center justify-center pt-30">
          Get in Touch
        </h1>
        <p className="pl-8 text-white">
          Building Connections, One Message at a Time
        </p>

        {/* main Box */}
        <div
          className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[70%]
                  bg-white w-[900px] h-[600px] grid grid-cols-2 p-6 shadow-xl rounded-xl"
        >
          {/* Left - Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow space-y-6"
          >
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              Send Us a Message
            </h3>
            <p className="text-gray-600 text-center text-sm">
              We’d love to hear from you! Fill out the form below and we’ll get
              back to you soon.
            </p>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="2"
                className="w-full border p-3 rounded-md focus:ring focus:ring-blue-300 outline-none"
                required
              ></textarea>
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-400 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-500 transition"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Right - Contact Info */}
          <div className="bg-gray-900 text-white rounded-xl p-6 space-y-6">
            {/* Visit Us Section */}
            <div>
              <h3 className="text-lg font-semibold">Visit Us</h3>
              <div className="space-y-3 mt-3">
                <p className="flex items-center gap-2">
                  📞 <span>+977 98*******1</span>
                </p>
                <p className="flex items-center gap-2">
                  📍 <span>Morang, Nepal</span>
                </p>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div>
              <p className="font-bold">Get in Touch</p>
              <p>You can get in touch with us on this provided email.</p>
              <p className="text-blue-400 font-medium">
                Tales & Tea@gmail.com
              </p>
            </div>

            {/* Map Section */}
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.051499196967!2d85.32396071506255!3d27.7172459827895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjEiTiA4NcKwMTknMjYuMyJF!5e0!3m2!1sen!2snp!4v1618309300000!5m2!1sen!2snp"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
