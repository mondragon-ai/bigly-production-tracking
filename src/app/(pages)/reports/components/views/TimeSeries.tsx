import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {useFilterAnalytics} from "../../hooks/useFilterAnalytics";
import styles from "../../../../../components/Shared.module.css";
import {FilterCard} from "@/components/analytics/FilterCard";
import {LineChartStats} from "@/components/analytics/charts";
import {allHeader, getMetricsByPlatform} from "./mapping";
import {ChartDateProps} from "@/lib/types/analytics";
import {useWidth} from "@/lib/hooks/useWidth";
import {Icon} from "@/components/shared/Icon";
import {useCallback, useMemo} from "react";
import {RowTable} from "./RowTable";

type ViewTypes = "table" | "time" | "chart";

type TimeSeriesProps = {
  analytics: Record<string, any>[];
  type: ViewTypes;
};

export const TimeSeries = ({analytics, type}: TimeSeriesProps) => {
  const width = useWidth();
  const {
    row,
    data,
    total,
    platform,
    metrics,
    visualizationMetrics,
    setMetrics,
    setPlatform,
    setVisualizationMetrics,
  } = useFilterAnalytics(analytics, type);

  const handlePlatformChange = useCallback(
    (newPlatform: typeof platform) => {
      setPlatform(newPlatform);
      setMetrics([]);
      setVisualizationMetrics([]);
    },
    [setPlatform, setMetrics, setVisualizationMetrics],
  );

  const headers = useMemo(() => {
    if (platform === "All") {
      return allHeader;
    }

    const firstRow = row[0] || {};
    return Object.keys(firstRow).map((key) => ({
      key,
      name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  }, [platform, row]);

  const availableMetrics = getMetricsByPlatform(platform);

  if (type !== "time") return null;

  return (
    <section
      className={styles.rowSection}
      style={{marginTop: "1rem", justifyContent: "space-between"}}
    >
      <div
        className={styles.rowSection}
        style={{flexDirection: "column", width: width < 720 ? "100%" : "80%"}}
      >
        {data.length > 0 ? (
          <AnalyticsCard
            title={visualizationMetrics.toLocaleString()}
            width={100}
            fixed={2}
            prefix="$"
            main_value={String(total)}
            is_money={true}
            negative={false}
            metric=""
          >
            <LineChartStats
              data={data as ChartDateProps[]}
              suffix=""
              is_money={true}
            />
          </AnalyticsCard>
        ) : (
          <SkeletonAnalytic width={100} />
        )}

        <RowTable headers={headers} rows={row} />
      </div>

      <FilterCard width={19}>
        <FilterSection
          title="Platforms"
          selected={platform}
          options={["All", "Shopify", "Recharge", "Stripe", "Klaviyo"]}
          onSelect={handlePlatformChange}
        />

        <FilterSection
          title="Metrics"
          selectedOptions={metrics}
          options={availableMetrics}
          onSelect={setMetrics}
          multiple
        />

        <FilterSection
          title="Visualize"
          selectedOptions={visualizationMetrics}
          options={metrics}
          onSelect={setVisualizationMetrics}
        />
      </FilterCard>
    </section>
  );
};

const FilterSection = ({
  title,
  options,
  onSelect,
  selected,
  selectedOptions,
  multiple = false,
}: {
  title: string;
  options: string[];
  onSelect: (value: any) => void;
  selected?: string;
  selectedOptions?: string[];
  multiple?: boolean;
}) => {
  const handleClick = (option: string) => {
    if (multiple && selectedOptions) {
      const updated = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      onSelect(updated);
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
          onClick={() => handleClick(option)}
          style={{cursor: "pointer"}}
        >
          {option}
          <Icon
            icon="badge-check"
            tone={
              (selected && selected === option) ||
              selectedOptions?.includes(option)
                ? "magic"
                : "info"
            }
          />
        </span>
      ))}
    </div>
  );
};
