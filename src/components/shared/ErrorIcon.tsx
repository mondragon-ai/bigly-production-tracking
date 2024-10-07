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
    <div className={styles.errorCard}>
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
