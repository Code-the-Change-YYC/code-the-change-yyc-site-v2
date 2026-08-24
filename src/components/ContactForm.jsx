"use client";

function InputField({ name, inputType = "text", placeholder }) {
  return (
    <div className="mb-4 w-full">
      <label className="mb-2 block pl-4 text-sm/5" htmlFor={name.toLowerCase()}>
        {name}
      </label>
      <input
        className="block w-full rounded-xl border border-gray-800 py-3 pr-3 pl-4"
        type={inputType}
        id={name.toLowerCase()}
        name={name.toLowerCase()}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default function ContactForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    form.reset();

    //Logging the data for now, might be used for something later
    console.log(formJson);

    alert("Your message has been received!");
  }

  return (
    <div className="font-omnes text-grey-800">
      <p className="text-2xl">
        Wanna connect with us about a project, partnership, or anything else?
        Shoot us an email at{" "}
        <a className="font-semibold" href="mailto:codethechangeyyc@gmail.com!">
          codethechangeyyc@gmail.com
        </a>
        !
      </p>
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="md:flex md:justify-between md:gap-6">
          <InputField name="Name" placeholder="Your full name" />
          <InputField
            name="Email"
            inputType="email"
            placeholder="you@example.com"
          />
        </div>
        <InputField name="Subject" placeholder="Ex: Partnership Inquiry" />
        <InputField
          name="Message"
          placeholder="Anything you'd like us to know"
        />
        <button
          className="mt-4 flex w-full cursor-pointer content-center justify-center gap-4 rounded-xl bg-purple-500 px-3 py-2 text-xl font-semibold text-white"
          type="submit"
        >
          Send Your Message
          {/*A crude paper airplane svg, might be better to replace it with an image*/}
          <svg
            className="block fill-none stroke-current stroke-3"
            aria-hidden="true"
            width="40"
            height="30"
            viewBox="-2 -2 44 34"
          >
            <polyline points="5,15 0,0 40,15 0,30 5,15 20,15" />
          </svg>
        </button>
      </form>
    </div>
  );
}
