"use client";
import {Button} from "@/components/shared/Button";
import {Icon} from "@/components/shared/Icon";
import useLogin from "@/lib/hooks/useAuth";
import localFont from "next/font/local";
import styles from "./page.module.css";
import {LOGO} from "@/lib/constants";
import Image from "next/image";
import {useState} from "react";

const geistSans = localFont({
  src: "./fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Enter() {
  const {login, loading, error, setError} = useLogin();
  const [email, setEmail] = useState("");
  const [show, toggleShow] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (email == "" || password == "") {
      setError("Email and password is required");
      return;
    }
    await login(email, password);
  };

  return (
    <div className={styles.page}>
      <div>
        <div
          className={styles.left}
          style={{padding: 0, background: "#000000"}}
        >
          <div className={styles.backgroundContainer}>
            <Image
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png"
              alt=""
              width={800}
              height={800}
            />
            <div className={styles.stars}></div>
            <div className={styles.twinkling}></div>
            <div className={styles.clouds}></div>
            <Image
              src={LOGO}
              alt={"logo"}
              width={75}
              height={50}
              className={styles.logo}
            />
            <div className={styles.txt}>
              <h1 className={geistSans.className}>
                Tracking <br />
                Made <br />
                Easy
              </h1>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={geistSans.className}>Welcome Back</h1>
          <span>Sign in and start tracking</span>
          <div>
            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="biglyboys@gobigly.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input
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
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
                width: "100%",
              }}
            >
              {error}
            </p>
            <Button
              loading={loading}
              width={100}
              text={"Log In"}
              thin={false}
              tone={"success"}
              align={"center"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
