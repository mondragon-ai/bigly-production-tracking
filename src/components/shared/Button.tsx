import styles from "./Shared.module.css";

type ButtonProps = {
  text: string;
};
export const Button = ({text}: ButtonProps) => {
  return (
    <button className={styles.btnBase} role="button">
      {text}
    </button>
  );
};
