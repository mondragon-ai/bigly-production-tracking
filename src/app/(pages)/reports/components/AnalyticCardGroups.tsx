import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {
  BarChartStats,
  ComparedBarChart,
  StackedBarChart,
} from "@/components/analytics/charts";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {LoadingTypes} from "@/lib/types/shared";
import styles from "../../../../components/Shared.module.css";

type AnalyticsCardGroupProps = {
  loading: LoadingTypes;
  cards: CardConfig[];
};

export type CardConfig = {
  title: string;
  width: number;
  value: string | undefined;
  prefix?: "" | "$" | undefined;
  suffix?: "%" | "h" | "" | undefined;
  fixed?: number;
  isMoney?: boolean;
  negative?: boolean;
  metric?: string | "%" | "h" | undefined;
  chartType?: "bar" | "stacked" | "compared";
  chartData?: any;
  color?: string;
};

export const AnalyticsCardGroup = ({
  loading,
  cards,
}: AnalyticsCardGroupProps) => {
  return (
    <section
      className={styles.rowSection}
      style={{
        marginTop: "1rem",
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {cards.map((card, idx) =>
        loading ? (
          <SkeletonAnalytic key={idx} width={card.width} />
        ) : (
          <AnalyticsCard
            key={idx}
            title={card.title}
            width={card.width}
            fixed={card.fixed}
            prefix={card.prefix}
            main_value={card.value}
            is_money={card.isMoney}
            negative={card.negative}
            metric={card.metric}
          >
            {card.chartData && card.chartType === "bar" && (
              <BarChartStats
                color={card.color ?? "#A1A5F4"}
                data={card.chartData}
                fixed={card.fixed}
                prefix={card.prefix}
                is_money={card.isMoney}
                negative={card.negative}
                suffix={card.suffix}
              />
            )}
            {card.chartData && card.chartType === "stacked" && (
              <StackedBarChart
                color={card.color ?? "#A1A5F4"}
                data={card.chartData}
                suffix={card.suffix}
                fixed={card.fixed}
              />
            )}
            {card.chartData && card.chartType === "compared" && (
              <ComparedBarChart
                color={card.color ?? "#A1A5F4"}
                data={card.chartData}
                suffix={card.suffix}
                is_money={card.isMoney}
                fixed={card.fixed}
                prefix={card.prefix}
              />
            )}
          </AnalyticsCard>
        ),
      )}
    </section>
  );
};
