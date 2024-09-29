import styles from "./Shared.module.css";
export const Divider = ({width}: {width: number}) => {
  return (
    <div className={styles.divider}>
      <hr style={{width: `${width}%`}} />
    </div>
  );
};
