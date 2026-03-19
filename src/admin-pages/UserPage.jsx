import { useAuth } from "../context/AuthContext.jsx";
import { UserDetail } from "../components/admin/UserDetail.jsx";
import styles from "./Userpage.module.css";

export function UserPage() {
  // const users = getAllUsers();
  const { allUsers } = useAuth();

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>
        <div className={styles.users}>
          {allUsers.map((user) => {
            return <UserDetail key={user.id} user={user} />;
          })}
        </div>
      </div>
    </div>
  );
}
