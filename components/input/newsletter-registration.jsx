import Button from "../ui/button";
import styles from "./newsletter-registration.module.css";
import { useRef } from "react";

const NewsLetterRegistration = () => {
  const emailInputRef = useRef();

  const handleSubscription = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        subscriptionEmail: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={handleSubscription}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <Button>Register</Button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetterRegistration;
