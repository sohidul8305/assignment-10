import React from "react";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        className="input input-bordered w-full"
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Message"
        className="textarea textarea-bordered w-full"
      />
      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
