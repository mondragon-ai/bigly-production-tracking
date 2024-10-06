import styles from "./Skeleton.module.css";

type SkeletonTextProps = {
  width: number;
  header: boolean;
  color?: string;
};

export const SkeletonText = ({width, header, color}: SkeletonTextProps) => {
  return (
    <div className={styles.textWrapper}>
      {header ? (
        <div
          className={styles.hdr}
          style={{width: `${width}%`, background: color}}
        ></div>
      ) : (
        <>
          <div className={styles.pgr}></div>
          <div className={styles.pgr}></div>
          <div className={styles.pgr}></div>
          <div className={styles.pgr}></div>
        </>
      )}
    </div>
  );
};

export const SkeletonBadge = () => {
  return (
    <div className={styles.badgeSkeleton}>
      <div></div>
    </div>
  );
};
