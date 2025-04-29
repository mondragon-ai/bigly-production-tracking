import {CleanedAnalytics} from "@/lib/types/reports";
import styles from "../../../../../components/Shared.module.css";
import {RechargeTable} from "@/components/analytics/tables/RechargeTable";
import {StripeTable} from "@/components/analytics/tables/StripeTable";
import {ShopifyTable} from "@/components/analytics/tables/ShopifyTable";
import {KlaviyoTable} from "@/components/analytics/tables/KlaviyoTable";

type ViewTypes = "table" | "time" | "chart";

type TableViewProps = {
  analytics: CleanedAnalytics | null;
  type: ViewTypes;
};

export const TableView = ({analytics, type}: TableViewProps) => {
  if (type !== "table") return null;

  return (
    <>
      <section
        className={styles.rowSection}
        style={{marginTop: "1rem", justifyContent: "space-between"}}
      >
        <RechargeTable title={"Recharge"} width={54} data={analytics} />
        <StripeTable title={"Stripe"} width={45} data={analytics} />
      </section>

      <section
        className={styles.rowSection}
        style={{marginTop: "1rem", justifyContent: "space-between"}}
      >
        <ShopifyTable title={"Shopify"} width={100} data={analytics} />
      </section>

      <section
        className={styles.rowSection}
        style={{marginTop: "1rem", justifyContent: "space-between"}}
      >
        <KlaviyoTable title={"Klaviyo"} width={100} data={analytics} />
      </section>
    </>
  );
};
