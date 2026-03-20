import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./UserDetail.module.css";
import { UserEditModal } from "./UserEditModal.jsx";

export function UserDetail({ user }) {
  const { blockUserAccount, deleteUserAccount } = useAuth();

  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [isShow, setIsShow] = useState(false);

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
        <Button
          variant="secondary"
          size="small"
          onClick={() => setIsShow(true)}
        >
          Edit
        </Button>
        <Button variant="danger" size="small" onClick={handleBlockUser}>
          {isBlocked ? "Unblock" : "Block"}
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={() => deleteUserAccount(user.id)}
        >
          Delete
        </Button>
      </div>

      <UserEditModal
        id={user.id}
        isShow={isShow}
        name={user.name}
        email={user.email}
        age={user.age}
        gender={user.gender}
        password={user.password}
        onClose={() => setIsShow(false)}
      />
    </div>
  );
}
