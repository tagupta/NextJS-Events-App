import Button from "../ui/button";
import styles from "./newsletter-registration.module.css";
import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";

const NewsLetterRegistration = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const handleSubscription = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      status: "pending",
      title: "Signing up...",
      message: "Registering for newsletter.",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        subscriptionEmail: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          status: "success",
          title: "Success!!",
          message: "Successfully registered for newsletter!!",
        });
        console.log(data);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          status: "error",
          title: "Error!",
          message: error.message || "Something went wrong!",
        });
      });
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
