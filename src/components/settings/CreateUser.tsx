import {Dispatch, SetStateAction} from "react";
import {Button} from "../shared/Button";
import styles from "./Users.module.css";
import {Staff} from "@/lib/types/shared";
import {Stages} from "@/lib/types/jobs";

export const CreateUser = ({
  staff,
  setStaff,
  createItem,
}: {
  staff: Staff | null;
  setStaff: Dispatch<SetStateAction<Staff | null>>;
  createItem: (type: "store" | "staff") => void;
}) => {
  return (
    <div className={styles.detailWrapper}>
      <header>
        <div
          onClick={() => setStaff((prev) => prev && {...prev, role: "admin"})}
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
          onClick={() => setStaff((prev) => prev && {...prev, role: "staff"})}
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
          <input
            type="text"
            value={staff?.email}
            onChange={(e) =>
              setStaff((prev) => prev && {...prev, email: e.target.value})
            }
          />
        </div>
        <div className={styles.inputWrapper} style={{flexDirection: "row"}}>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Name</label>
            <input
              type="text"
              value={staff?.name}
              onChange={(e) =>
                setStaff((prev) => prev && {...prev, name: e.target.value})
              }
            />
          </div>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Role</label>
            <select
              id="standard-select"
              onChange={(e) =>
                setStaff(
                  (prev) =>
                    prev && {...prev, position: e.target.value as Stages},
                )
              }
            >
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
          onClick={() => createItem("staff")}
          text={"Add Staff"}
          thin={true}
          tone={"success"}
          align={"left"}
          icon="floppy"
        />
      </footer>
    </div>
  );
};

const roles = [
  {value: "", title: "Select Position"},
  {value: "printing", title: "Printing"},
  {value: "cutting", title: "Cutting"},
  {value: "pressing", title: "Pressing"},
  {value: "double", title: "Double"},
  {value: "folding", title: "Folding"},
  {value: "manager", title: "Manager"},
];

export const UserCard = ({
  staff,
  deleteItem,
}: {
  staff: Staff | null;
  deleteItem: (type: "store" | "staff") => void;
}) => {
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
          <div
            className={styles.box}
            style={{
              width: "100%",
              padding: "12px 20px",
              margin: "0px 0",
              display: "inline-block",
              border: " 2px solid var(--foreground)",
              borderRadius: "4px",
              color: " var(--primary-text)",
              boxSizing: "border-box",
              backgroundColor: "var(--background)",
            }}
          >
            <span>{staff?.email}</span>
          </div>
        </div>
        <div className={styles.inputWrapper} style={{flexDirection: "row"}}>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Name</label>
            <div
              className={styles.box}
              style={{
                width: "100%",
                padding: "12px 20px",
                margin: "0px 0",
                display: "inline-block",
                border: " 2px solid var(--foreground)",
                borderRadius: "4px",
                color: " var(--primary-text)",
                boxSizing: "border-box",
                backgroundColor: "var(--background)",
              }}
            >
              <span>{staff?.name}</span>
            </div>
          </div>
          <div style={{width: "49%"}}>
            <label htmlFor="first_name">Role</label>
            <div
              className={styles.box}
              style={{
                width: "100%",
                padding: "12px 20px",
                margin: "0px 0",
                display: "inline-block",
                border: " 2px solid var(--foreground)",
                borderRadius: "4px",
                color: " var(--primary-text)",
                boxSizing: "border-box",
                backgroundColor: "var(--background)",
              }}
            >
              <span>{staff?.position}</span>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Button
          onClick={() => deleteItem("staff")}
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
