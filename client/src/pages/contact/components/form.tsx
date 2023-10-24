import { SubmitHandler, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  text: string;
}

const ContactForm: React.FC = () => {
  /* States */
  const [statusOk, setStatusOk] = useState<string | null>(null);
  const [statusBad, setStatusBad] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  /* onSubmit Function */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const emailData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      text: data.text,
    };
    emailjs
      .send(
        "service_yfxs46b",
        "template_xqwapev",
        emailData,
        "aHefCKRxgW_roS3Li"
      )
      .then(
        function () {
          setStatusOk("S U C C E S S !");
          reset();
        },
        function () {
          setStatusBad("FAILED. Please try again.");
        }
      );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            autoComplete="given-name"
            type="text"
            id="name"
            placeholder="Full name"
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            autoComplete="family-name"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            autoComplete="off"
            type="string"
            id="phone"
            placeholder="Phone"
            {...register("phone", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            {...register("subject")}
          />
        </div>

        <div>
          <label htmlFor="text">Text:</label>
          <textarea id="text" {...register("text")} />
        </div>

        <button type="submit">Submit</button>
        {statusOk && (
          <p className="status" style={{ color: "white" }}>
            {statusOk}
          </p>
        )}
        {statusBad && (
          <p className="status" style={{ color: "red" }}>
            {statusBad}
          </p>
        )}
      </form>
    </>
  );
};

export default ContactForm;
