"use client";
import {getInitials} from "@/lib/utils/converter.tsx/text";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {Button} from "@/components/shared/Button";
import useProfile from "@/lib/hooks/useProfile";
import {ErrorIcon} from "@/components/shared/ErrorIcon";
import {useState} from "react";
import {Icon} from "@/components/shared/Icon";

export default function Settings() {
  const {loading, user, error, setError, updatePassword} = useProfile();
  const [password, setPassword] = useState(user.password || "");
  const [show, toggleShow] = useState(false);

  const handleUpdatePassword = () => {
    if (!password) return;
    updatePassword(password);
  };
  return (
    <div className={styles.page}>
      {error && (
        <ErrorIcon text={error || ""} closeError={() => setError(null)} />
      )}
      <PageHeader
        title="Profile Settings"
        buttons={[]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <div>
        <div className={styles.rowSection} style={{width: "100%"}}>
          <section className={styles.avatarWrapper}>
            <div>{true ? <h6>{getInitials(user.name)}</h6> : <h6>BB</h6>}</div>
            <span>
              {user.role} - {user.position}
            </span>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
          </section>
          <section className={styles.settingsWrapper}>
            <div>
              <header>
                <h4>Password</h4>
                <Button
                  text={"Save"}
                  thin={true}
                  icon={"floppy"}
                  onClick={handleUpdatePassword}
                  loading={loading == "requesting"}
                  tone={"success"}
                  align={"center"}
                />
              </header>
              <div>
                <div className={styles.inputWrapper}>
                  <label htmlFor="password">Password</label>
                  <input
                    value={password}
                    type={show ? "text" : "password"}
                    placeholder="******"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className={styles.togglePass}
                    onClick={() => toggleShow(!show)}
                  >
                    <Icon icon={show ? "eye" : "eye-slash"} tone={"info"} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
