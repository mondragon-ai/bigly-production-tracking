import styles from "../Shared.module.css";

export const AnalyticsCard = ({
  title,
  main_value,
  metric,
  children,
  width,
  fixed,
}: {
  title: string;
  width: number;
  main_value?: string;
  metric?: string;
  children: React.ReactNode;
  fixed?: number;
}) => (
  <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
    <header>
      <h5>{title}</h5>
      <h2>
        {fixed ? Number(main_value).toFixed(fixed) : main_value}
        <span>{metric}</span>
      </h2>
    </header>
    <main className={styles.chartContainer}>{children}</main>
  </div>
);
