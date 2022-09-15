import styles from "./notification.module.css";
import NotificationContext from "../../store/notification-context";
import { useContext } from "react";

const Notification = ({ status, title, message }) => {
  const notificationCtx = useContext(NotificationContext);

  let statusStyle = "";
  if (status === "success") {
    statusStyle = styles.success;
  } else if (status === "error") {
    statusStyle = styles.error;
  } else if (status === "pending") {
    statusStyle = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusStyle}`;
  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <div className={styles.footer}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
