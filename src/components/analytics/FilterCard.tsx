import styles from "../Shared.module.css";
import {Badge} from "../shared/Badge";

export const FilterCard = ({
  children,
  width,
  apply,
}: {
  width: number;
  children: React.ReactNode;
  apply: () => void;
}) => {
  return (
    <div
      className={`${styles.chartWrapperBox}`}
      style={{width: `${width}%`, background: "white"}}
    >
      <header
        style={{
          padding: "1rem 10px 0px 10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h5 style={{width: "fit-content"}}>Filter Time Series</h5>
        <Badge
          icon={"wand"}
          text={"Apply"}
          tone={"info"}
          onClick={apply}
          className={styles.applyBtn}
        />
      </header>
      <main className={`${styles.filterCardBox}`}>{children}</main>
    </div>
  );
};
