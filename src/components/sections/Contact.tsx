const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800">Contact Me</h2>
        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border-gray-300 rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border-gray-300 rounded-md p-2"
          />
          <textarea
            placeholder="Your Message"
            className="w-full border-gray-300 rounded-md p-2"
            rows={5}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
