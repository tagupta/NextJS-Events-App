import Button from "../ui/button";
import styles from "./newsletter-registration.module.css";

const NewsLetterRegistration = () => {
  const handleSubscription = (event) => {
    event.preventDefault();
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
          />
          <Button>Register</Button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetterRegistration;
