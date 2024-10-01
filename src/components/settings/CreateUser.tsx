import Image from "next/image";
import {Button} from "../shared/Button";
import styles from "./Users.module.css";

export const CreateUser = () => {
  return (
    <div className={styles.detailWrapper}>
      <header>
        <div
          className={`${styles.boxBtn} ${styles.inactive}`}
          style={{width: "49%"}}
        >
          <h5>Admin</h5>
          <p>
            Ability to create and modify jobs, view analytics, and modify
            settings
          </p>
        </div>
        <div className={`${styles.boxBtn}`} style={{width: "49%"}}>
          <h5>Staff</h5>
          <p>
            Limited permissions. Handle single items, report item errors, and
            complete Jobs
          </p>
        </div>
      </header>

      <main>
        <div className={styles.inputWrapper}>
          <label htmlFor="first_name">Email</label>
          <input type="text" />
        </div>
        <div className={styles.inputWrapper} style={{flexDirection: "row"}}>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Name</label>
            <input type="text" />
          </div>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Role</label>
            <select id="standard-select">
              {roles &&
                roles.map((r, i) => {
                  return (
                    <option key={i} value={r.value}>
                      {r.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </main>
      <footer>
        <Button
          text={"Delete Image"}
          thin={true}
          tone={"descructive"}
          align={"left"}
          icon="trash"
        />
      </footer>
    </div>
  );
};

const roles = [
  {value: "manager", title: "Manager"},
  {value: "team_lead", title: "Team Lead"},
  {value: "pressing", title: "Pressing"},
  {value: "cutting", title: "Cutting"},
];
