import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./UserDetail.module.css";

export function UserDetail({ user }) {

  const { blockUserAccount, deleteUserAccount } = useAuth();

  const [isBlocked, setIsBlocked] = useState(user.isBlocked);

  const handleBlockUser = () => {
    blockUserAccount(user.id);
    setIsBlocked((prev) => {
      return !prev;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <p className={styles.name}>{user.name}</p>
        <span className={styles.email}>Email: </span>
        <span className={styles.userEmail}>{user.email}</span>
        {/* <p>Email: {user.email}</p> */}
      </div>

      <div className={styles.buttons}>
        <Button variant="secondary" size="small">
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={handleBlockUser}>
          {isBlocked ? "Unblock" : "Block"}
        </Button>
        <Button variant="danger" size="small" onClick={() => deleteUserAccount(user.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
