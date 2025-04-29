import styles from "../Shared.module.css";

export const FilterCard = ({
  children,
  width,
}: {
  width: number;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
      <header>
        <h5>Filter Time Series</h5>
      </header>
      <main className={styles.chartContainer}>{children}</main>
    </div>
  );
};
