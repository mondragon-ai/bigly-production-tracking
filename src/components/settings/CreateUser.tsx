import {Button} from "../shared/Button";
import styles from "./Users.module.css";
import {Staff} from "@/lib/types/shared";

export const CreateUser = ({staff}: {staff: Staff | null}) => {
  return (
    <div className={styles.detailWrapper}>
      <header>
        <div
          className={`${styles.boxBtn} ${
            staff?.role !== "admin" ? styles.inactive : null
          }`}
          style={{width: "49%"}}
        >
          <h5>Admin</h5>
          <p>
            Ability to create and modify jobs, view analytics, and modify
            settings
          </p>
        </div>
        <div
          className={`${styles.boxBtn} ${
            staff?.role !== "staff" ? styles.inactive : null
          }`}
          style={{width: "49%"}}
        >
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
          <input type="text" value={staff?.email} />
        </div>
        <div className={styles.inputWrapper} style={{flexDirection: "row"}}>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Name</label>
            <input type="text" value={staff?.name} />
          </div>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Role</label>
            <select id="standard-select">
              {roles &&
                roles.map((r, i) => {
                  if (staff?.created_at && staff.position == "pressing") {
                    return (
                      <option key={i} value={staff.position}>
                        {staff.position}
                      </option>
                    );
                  }
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
          text={"Delete Staff"}
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
