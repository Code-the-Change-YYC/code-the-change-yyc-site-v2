'use client'

const InputField = ({ name, inputType = "text", placeholder }) => {
    return (
      <div className="mb-4 w-full">
        <label
          className="block text-sm/5 pl-4 mb-2"
          htmlFor={ name.toLowerCase() }>
            {name}
        </label>
        <input
          className="block border border-gray-400 rounded-xl py-3 pr-3 pl-4 w-full"
          type={inputType}
          id={ name.toLowerCase() }
          name={ name.toLowerCase() }
          placeholder={placeholder}
          required />
      </div>
  );
};

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries( formData.entries() );

    form.reset();

    //Logging the data for now, might be used for something later
    console.log( formJson );

    alert("Your message has been received!");
  }

  return (
    <div>
      <p className="text-2xl">
        Wanna connect with us about a project, partnership, or anything else? Shoot us an email at <a className="font-semibold" href="mailto:codethechangeyyc@gmail.com!">codethechangeyyc@gmail.com</a>!
      </p>
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="md:flex md:justify-between md:gap-6">
          <InputField name="Name" placeholder="Your full name" />
          <InputField name="Email" inputType="email" placeholder="you@example.com" />
        </div>
        <InputField name="Subject" placeholder="Ex: Partnership Inquiry" />
        <InputField name="Message" placeholder="Anything you'd like us to know" />
        <input
          className="cursor-pointer mt-4 rounded-xl px-3 py-2 bg-[#00D3A9] text-2xl font-semibold text-white w-full"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
};

export default ContactForm;