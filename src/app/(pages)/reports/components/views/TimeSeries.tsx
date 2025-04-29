import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {FilterCard} from "@/components/analytics/FilterCard";
import {LineChartStats} from "@/components/analytics/charts";
import tableStyles from "../../../../../components/files/Files.module.css";
import {useWidth} from "@/lib/hooks/useWidth";
import styles from "../../../../../components/Shared.module.css";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import {SortingColumn} from "@/components/analytics/tables/SortingColumn";
import {CleanedAnalytics} from "@/lib/types/reports";
import {useState} from "react";
import {PlatformType, useFilterAnalytics} from "../../hooks/useFilterAnalytics";
import {Icon} from "@/components/shared/Icon";
import {getHeadersByPlatform, getMetricsByPlatform} from "./mapping";
import {RowTable} from "./RowTable";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";

type ViewTypes = "table" | "time" | "chart";

type TimeSeriesProps = {
  analytics: any;
  type: ViewTypes;
};

export const TimeSeries = ({analytics, type}: TimeSeriesProps) => {
  const {
    row,
    data,
    platform,
    metrics,
    visualizationMetrics,
    setMetrics,
    setPlatform,
    setVisualizationMetrics,
  } = useFilterAnalytics(analytics);
  const width = useWidth();

  if (type !== "time") return null;

  const handlePlatform = (newPlatform: PlatformType) => {
    setPlatform(newPlatform);
    setMetrics([]);
    setVisualizationMetrics([]);
  };

  const headers = getHeadersByPlatform(platform);
  const visOptions = getMetricsByPlatform(platform);

  return (
    <section
      className={styles.rowSection}
      style={{marginTop: "1rem", justifyContent: "space-between"}}
    >
      <div
        className={styles.rowSection}
        style={{flexDirection: "column", width: width < 720 ? "100%" : "80%"}}
      >
        {data ? (
          <AnalyticsCard
            title="Order"
            width={100}
            fixed={2}
            prefix=""
            main_value="1234"
            is_money={false}
            negative={false}
            metric=""
          >
            <LineChartStats data={[]} />
          </AnalyticsCard>
        ) : (
          <SkeletonAnalytic width={100} />
        )}

        <RowTable headers={headers} rows={row} />
      </div>

      <FilterCard width={19}>
        <FilterSection
          title="Platforms"
          platform={platform}
          options={["All", "Shopify", "Recharge", "Stripe", "Klaviyo"]}
          onSelect={handlePlatform}
        />

        <FilterSection
          title="Metrics"
          metrics={metrics}
          platform={platform}
          options={visOptions}
          onSelect={setMetrics}
          multiple
        />

        <FilterSection
          title="Visualize"
          metrics={visualizationMetrics}
          platform={platform}
          options={visOptions}
          onSelect={setVisualizationMetrics}
        />
      </FilterCard>
    </section>
  );
};

type FilterSectionProps = {
  title: string;
  options: string[];
  platform: PlatformType;
  onSelect: (value: any) => void;
  multiple?: boolean;
  metrics?: string[] | null;
};

const FilterSection = ({
  title,
  options,
  onSelect,
  multiple = false,
  platform,
  metrics,
}: FilterSectionProps) => {
  const handleSelect = (option: string) => {
    if (multiple) {
      onSelect((prev: string[]) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      );
    } else {
      onSelect(option);
    }
  };

  return (
    <div className={styles.filterBox} style={{marginTop: "20px"}}>
      <header>
        <span>{title}</span>
      </header>
      {options.map((option) => (
        <span
          key={option}
          onClick={() => handleSelect(option)}
          style={{cursor: "pointer"}}
        >
          {option}
          <Icon
            icon={"badge-check"}
            tone={
              platform == option || metrics?.includes(option) ? "magic" : "info"
            }
          />
        </span>
      ))}
    </div>
  );
};
