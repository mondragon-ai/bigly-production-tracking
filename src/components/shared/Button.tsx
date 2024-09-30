import styles from "./Shared.module.css";

type ButtonProps = {
  text: string;
  thin: boolean;
};
export const Button = ({text, thin}: ButtonProps) => {
  return (
    <button
      className={styles.btnBase}
      style={{
        fontWeight: thin ? 500 : 600,
        fontSize: thin ? "14px" : "18px",
        padding: thin ? "0 5px" : "0 18px",
        lineHeight: thin ? "18px" : "50px",
      }}
      role="button"
    >
      {text}
    </button>
  );
};
