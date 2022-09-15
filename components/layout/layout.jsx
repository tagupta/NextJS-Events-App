import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          status={activeNotification.status}
          title={activeNotification.title}
          message={activeNotification.message}
        />
      )}
    </Fragment>
  );
};

export default Layout;
