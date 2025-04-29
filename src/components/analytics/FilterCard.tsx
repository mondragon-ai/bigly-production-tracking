import styles from "../Shared.module.css";

export const FilterCard = ({
  children,
  width,
}: {
  width: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${styles.chartWrapperBox}`}
      style={{width: `${width}%`, background: "white"}}
    >
      <header style={{padding: "1rem 10px"}}>
        <h5>Filter Time Series</h5>
      </header>
      <main className={`${styles.filterCardBox}`}>{children}</main>
    </div>
  );
};
