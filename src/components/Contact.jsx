import { useState } from "react";
import axios from "axios";

const fromEndpoint = import.meta.env.VITE_APP_WP_API_FORM_ENDPOINT;

const Form = () => {

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const contactForm = new FormData();
        contactForm.append("your-name", name);
        contactForm.append("your-email", email);
        contactForm.append("your-message", message);

        axios
        .post(fromEndpoint, contactForm, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          console.log(response);
          setSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    };

    if (submitted) {
        return (
          <>
            <h3>Thank you!</h3>
            <p>We'll be in touch soon</p>
          </>
        );
    }
    
    if (error) {
        return (
          <>
            <h3>Error!</h3>
            <p>Sorry, we were unable to send your message</p>
          </>
        )
    }

    return (
      <>
        <div className="signup-form">
          <div className='signup-title'>
            <h3>Sign up for the latest updates from Hospice</h3>
            <p>Stay up to date with the latest from Te Kahu Pairuri o Aotearoa Hospice New Zealand, through our email updates and newsletters</p>
          </div>
          <form
              onSubmit={handleSubmit}
              method="POST"
          >
              {/* name */}
              <div className="form-field">
                  <label htmlFor="name"></label>
                  <input
                  placeholder="Full name"
                  type="text"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  required
                  />
              </div>

              {/* email */}
              <div className="form-field">
                  <label htmlFor="email"></label>
                  <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                  />
              </div>

              {/* button */}
              <div className="form-field">
                  <button
                  className="primary-button"
                  type="submit"
                  >
                  Sign up
                  </button>
              </div>
          </form>
        </div>
      </>
    )
};

export default Form
