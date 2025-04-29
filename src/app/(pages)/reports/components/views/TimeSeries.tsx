import {CleanedAnalytics} from "@/lib/types/reports";
import styles from "../../../../../components/Shared.module.css";
import {RechargeTable} from "@/components/analytics/tables/RechargeTable";
import {StripeTable} from "@/components/analytics/tables/StripeTable";
import {ShopifyTable} from "@/components/analytics/tables/ShopifyTable";
import {KlaviyoTable} from "@/components/analytics/tables/KlaviyoTable";
import {LineChartStats} from "@/components/analytics/charts";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {FilterCard} from "@/components/analytics/FilterCard";

type ViewTypes = "table" | "time" | "chart";

type TimeSeriesProps = {
  analytics: CleanedAnalytics | null;
  type: ViewTypes;
};

export const TimeSeries = ({analytics, type}: TimeSeriesProps) => {
  if (type !== "time") return null;

  return (
    <>
      <section
        className={styles.rowSection}
        style={{marginTop: "1rem", justifyContent: "space-between"}}
      >
        <AnalyticsCard
          title={"Order"}
          width={80}
          fixed={2}
          prefix={""}
          main_value={"1234"}
          is_money={false}
          negative={false}
          metric={""}
        >
          <LineChartStats data={[{date: "monday", value: 0}]} />
        </AnalyticsCard>
        <FilterCard width={19}>test</FilterCard>
      </section>
    </>
  );
};
