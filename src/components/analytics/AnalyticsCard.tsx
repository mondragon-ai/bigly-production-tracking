import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import styles from "../Shared.module.css";

export const AnalyticsCard = ({
  title,
  main_value,
  metric,
  children,
  width,
  fixed,
  negative = false,
  is_money = false,
  prefix = "",
}: {
  title: string;
  width: number;
  main_value?: string | undefined;
  metric?: string;
  children: React.ReactNode;
  fixed?: number;
  is_money?: boolean;
  negative?: boolean;
  prefix?: "$" | "" | undefined;
}) => {
  const header = fixed ? Number(main_value).toFixed(fixed) : main_value;

  return (
    <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
      <header>
        <h5>{title}</h5>
        <h2>
          {is_money
            ? `${negative ? "-" : ""}${prefix}${formatWithCommas(
                Number(header),
              )}`
            : header}
          <span>{metric}</span>
        </h2>
      </header>
      <main className={styles.chartContainer}>{children}</main>
    </div>
  );
};
