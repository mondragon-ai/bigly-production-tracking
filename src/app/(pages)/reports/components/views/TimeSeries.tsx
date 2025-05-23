import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import {useFilterAnalytics} from "../../hooks/useFilterAnalytics";
import styles from "../../../../../components/Shared.module.css";
import {FilterCard} from "@/components/analytics/FilterCard";
import {LineChartStats} from "@/components/analytics/charts";
import {allHeader, getMetricsByPlatform, StoresHeader} from "./mapping";
import {ChartDateProps} from "@/lib/types/analytics";
import {useWidth} from "@/lib/hooks/useWidth";
import {Icon} from "@/components/shared/Icon";
import {useCallback, useMemo} from "react";
import {RowTable} from "./RowTable";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";

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
    stores,
    total,
    platform,
    metrics,
    filteredStores,
    visualizationMetrics,
    chartConfig,
    setMetrics,
    setPlatform,
    setFilteredStores,
    setVisualizationMetrics,
    handleApplyChanges,
  } = useFilterAnalytics(analytics, type);

  const handlePlatformChange = useCallback(
    (newPlatform: typeof platform) => {
      setPlatform(newPlatform);
      setMetrics([]);
      setVisualizationMetrics([]);
      setFilteredStores(StoresHeader);
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

  const header = useMemo(() => {
    return chartConfig.isMoney
      ? `$${formatNumber(Number(total))}`
      : formatNumber(Number(total));
  }, [platform, row]);

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
            fixed={0}
            prefix=""
            suffix={chartConfig.isPercentage ? "%" : ""}
            main_value={header}
            is_money={false}
            negative={false}
            metric=""
          >
            <LineChartStats
              data={data}
              stores={stores}
              suffix={chartConfig.isPercentage ? "%" : ""}
              is_money={chartConfig.isMoney}
            />
          </AnalyticsCard>
        ) : (
          <SkeletonAnalytic width={100} />
        )}

        <RowTable headers={headers} rows={row} />
      </div>

      <FilterCard width={19} apply={handleApplyChanges}>
        <FilterSection
          title="Platforms"
          selected={platform}
          options={["All", "Shopify", "Recharge", "Stripe", "Klaviyo"]}
          onSelect={handlePlatformChange}
        />

        <FilterSection
          title="Stores"
          selectedOptions={filteredStores}
          options={StoresHeader}
          onSelect={setFilteredStores}
          multiple
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
