"use client";
import {
  BarChartStats,
  ComparedBarChart,
  HalfCircleStats,
  LineChartStats,
  StackedBarChart,
} from "@/components/analytics/charts";
import {SkeletonAnalytic} from "@/components/skeleton/SkeletonAnalytics";
import {AnalyticsHeader} from "@/components/analytics/AnalyticsHeader";
import {AnalyticsCard} from "@/components/analytics/AnalyticsCard";
import styles from "../../../components/Shared.module.css";
import {parseReportData} from "@/lib/payloads/reports";
import {TimeFrameTypes} from "@/lib/types/analytics";
import {useReports} from "@/lib/hooks/useReports";
import {useState} from "react";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";
import {BiglyGoalsCard} from "@/components/analytics/BiglyGoals";
import {Divider} from "@/components/shared/Divider";
import {RechargeTable} from "@/components/analytics/tables/AnalyticsTable";

export default function Analytics() {
  const [tf, setTimeFrame] = useState<TimeFrameTypes>("today");
  const {
    loading,
    analytics,
    goals: g,
    fetchTimeframe,
    saveGoals,
  } = useReports();

  const handleFetchingAnalytics = (t: TimeFrameTypes) => {
    const tp = [
      "today",
      "seven_days",
      "thirty_days",
      "mtd",
      "ninety_days",
      "twelve_months",
      "custom",
    ];
    console.log({t, b: tp.includes(t)});
    if (tp.includes(t)) {
      setTimeFrame(t);
    } else {
      setTimeFrame("custom");
    }
    fetchTimeframe(t);
  };

  return (
    <div className={styles.page}>
      <AnalyticsHeader
        reports={true}
        header={{
          total_units: 100,
          completed_units: 100,
          total_jobs: 100,
          completed_jobs: 100,
        }}
        title={"Daily Reports"}
        loading={loading}
        fetchAnalytics={handleFetchingAnalytics}
        timeframe={tf}
      />
      <div>
        <section
          className={styles.rowSection}
          style={{marginTop: "1rem", justifyContent: "space-between"}}
        >
          <RechargeTable title={"recharge"} width={50} data={analytics} />
        </section>
      </div>
    </div>
  );
}

// const ChartView = ({loading, }) => {

//   const {
//     monthly_sales_goals,
//     daily_sales_goals,

//     goals,

//     stripe,
//     recharge,
//     gross_sales,
//     discounts,
//     orders,
//     returns,
//     total_sales,
//     shipping_charges,

//     emails,
//     conversion_value,
//     open_rate,
//     click_rate,
//     recipients,
//     conversion_rate,
//   } = parseReportData(analytics, g);

//   return (
//     <div>
//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Daily Goals"}
//             width={49}
//             fixed={2}
//             is_money={true}
//             main_value={`${daily_sales_goals.churn}`}
//             metric=""
//             prefix="$"
//           >
//             {daily_sales_goals.stacked_chart ? (
//               <ComparedBarChart
//                 color={"#A1A5F4"}
//                 data={daily_sales_goals.stacked_chart}
//                 suffix={""}
//                 is_money={true}
//                 fixed={2}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Monthly Goals"}
//             width={49}
//             fixed={2}
//             is_money={true}
//             main_value={`${monthly_sales_goals.churn}`}
//             metric=""
//             prefix="$"
//           >
//             {monthly_sales_goals.stacked_chart ? (
//               <ComparedBarChart
//                 color={"#A1A5F4"}
//                 data={monthly_sales_goals.stacked_chart}
//                 suffix={""}
//                 is_money={true}
//                 fixed={2}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Gross Sales"}
//             width={32}
//             fixed={2}
//             is_money={true}
//             main_value={`${gross_sales.sum}`}
//             metric=""
//             prefix="$"
//           >
//             {gross_sales.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={gross_sales.bar_chart}
//                 suffix={""}
//                 is_money={true}
//                 fixed={2}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Orders"}
//             width={32}
//             main_value={`${orders.sum}`}
//             metric=""
//             fixed={0}
//             is_money={true}
//           >
//             {orders.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={orders.bar_chart}
//                 suffix={""}
//                 fixed={0}
//                 is_money={false}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Discounts"}
//             width={32}
//             main_value={`${discounts.sum}`}
//             fixed={2}
//             negative={true}
//             is_money={true}
//             prefix="$"
//           >
//             {discounts.sum ? (
//               <BarChartStats
//                 color={"#e85f5c"}
//                 data={discounts.bar_chart}
//                 suffix={""}
//                 fixed={2}
//                 is_money={true}
//                 negative={true}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Returns"}
//             width={32}
//             main_value={`${returns.sum}`}
//             metric=""
//             fixed={2}
//             negative={true}
//             is_money={true}
//             prefix="$"
//           >
//             {returns.sum ? (
//               <BarChartStats
//                 color={"#e85f5c"}
//                 data={returns.bar_chart}
//                 suffix={""}
//                 fixed={2}
//                 negative={true}
//                 is_money={true}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Total Sales"}
//             width={32}
//             main_value={`${total_sales.sum}`}
//             metric=""
//             fixed={2}
//             is_money={true}
//             prefix="$"
//           >
//             {total_sales.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={total_sales.bar_chart}
//                 suffix={""}
//                 fixed={2}
//                 is_money={true}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Shipping Charges"}
//             width={32}
//             main_value={`${shipping_charges.sum}`}
//             fixed={2}
//             is_money={true}
//             prefix="$"
//           >
//             {shipping_charges.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={shipping_charges.bar_chart}
//                 suffix={""}
//                 fixed={2}
//                 is_money={true}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Stripe Subscriptions"}
//             width={32}
//             main_value={`${stripe.churn}`}
//             metric="% churn"
//           >
//             {stripe.stacked_chart ? (
//               <StackedBarChart
//                 color={"#e85f5c"}
//                 data={stripe.stacked_chart}
//                 suffix={"%"}
//                 fixed={1}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" || total_sales.sum ? (
//           <SkeletonAnalytic width={32} />
//         ) : null}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Recharge Subscriptions"}
//             width={32}
//             main_value={`${recharge.churn}`}
//             metric="% churn"
//           >
//             {recharge.stacked_chart ? (
//               <StackedBarChart
//                 color={"#e85f5c"}
//                 data={recharge.stacked_chart}
//                 suffix={"%"}
//                 fixed={1}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Subscriptions"}
//             width={32}
//             main_value={`${emails.churn}`}
//             metric="% churn"
//           >
//             {emails.churn ? (
//               <StackedBarChart
//                 color={"#e85f5c"}
//                 data={emails.stacked_chart}
//                 suffix={""}
//                 fixed={1}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Campaign Value"}
//             width={32}
//             main_value={`${conversion_value.sum}`}
//             metric=""
//             fixed={2}
//             prefix="$"
//             is_money={true}
//           >
//             {returns.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={conversion_value.bar_chart}
//                 suffix={""}
//                 fixed={2}
//                 is_money={true}
//                 prefix="$"
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Open Rate"}
//             width={32}
//             main_value={`${open_rate.sum}`}
//             metric={"%"}
//             fixed={2}
//           >
//             {returns.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={open_rate.bar_chart}
//                 suffix={"%"}
//                 fixed={2}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Click Rate"}
//             width={32}
//             main_value={`${click_rate.sum}`}
//             metric="%"
//             fixed={3}
//           >
//             {click_rate.bar_chart ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={click_rate.bar_chart}
//                 suffix={"%"}
//                 fixed={3}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Campaign Recipiants"}
//             width={32}
//             main_value={`${formatNumber(recipients.sum!)}`}
//             metric=""
//             fixed={0}
//             prefix=""
//             is_money={false}
//           >
//             {recipients.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={recipients.bar_chart}
//                 suffix={""}
//                 fixed={0}
//                 is_money={true}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}

//         {loading == "loading" || loading == "posting" ? (
//           <SkeletonAnalytic width={32} />
//         ) : (
//           <AnalyticsCard
//             title={"Email Conversion Rate"}
//             width={32}
//             main_value={`${conversion_rate.sum}`}
//             metric="%"
//             fixed={3}
//           >
//             {conversion_rate.sum ? (
//               <BarChartStats
//                 color={"#A1A5F4"}
//                 data={conversion_rate.bar_chart}
//                 suffix={"%"}
//                 fixed={3}
//               />
//             ) : null}
//           </AnalyticsCard>
//         )}
//       </section>

//       <section
//         className={styles.rowSection}
//         style={{marginTop: "1rem", justifyContent: "space-between"}}
//       >
//         <BiglyGoalsCard width={100} goals={g!} saveGoals={saveGoals} />
//       </section>
//     </div>
//   );
// };
