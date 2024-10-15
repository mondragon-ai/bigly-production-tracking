"use client";
import {useEffect, useState} from "react";
import {Icon} from "./Icon";
import styles from "./Shared.module.css";

export const ErrorIcon = ({
  text,
  closeError,
}: {
  text: string;
  closeError: () => void;
}) => {
  return (
    <div
      className={styles.errorCard}
      style={{flexDirection: "row", marginBottom: "1rem"}}
    >
      <div>
        <Icon size={24} icon={"fire"} tone={"critical"} />
        <h5 style={{marginLeft: "10px", color: "var(--destructive-accent)"}}>
          {text}{" "}
        </h5>
      </div>
      <div onClick={() => closeError()}>
        <Icon size={24} icon={"close"} tone={"info"} />
      </div>
    </div>
  );
};

export const LoadingIndicator = ({loading}: {loading: string}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 5;
        return nextProgress > 97 ? 97 : nextProgress;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className={styles.errorCard} style={{marginBottom: "1rem"}}>
      <div className={styles.progressWrapper}>
        <div className={styles.progress} style={{width: `${progress}%`}}></div>
      </div>
      <div>
        <Icon size={24} icon={"clock"} tone={"magic"} />
        <div>
          <h5 style={{marginLeft: "10px"}}>
            Uploading & Generating - Please don't navigate away
          </h5>
          <p style={{marginLeft: "10px"}}>
            {progress <= 20
              ? "Parsing CSV"
              : progress > 20 && progress <= 70
              ? "Generating Jobs 🎨"
              : progress > 70 && progress <= 95
              ? "Saving Documents  💾"
              : "Almost There 🥳"}
          </p>
        </div>
      </div>
    </div>
  );
};

{
  /* 
<div className="progress-container">
  <div
    className="progress-bar"
    style={{ width: `${progress}%` }}
  ></div>
  <p>
    {progress <= 20
      ? "Uploading Images 📸"
      : progress > 20 && progress <= 70
      ? "Creating Mockup Images 🎨"
      : progress > 70 && progress <= 95
      ? "Storing & Creating Assets 💾"
      : "Almost There 🥳"}
  </p> */
}
