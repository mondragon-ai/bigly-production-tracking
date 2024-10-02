import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";

export default function Confirm() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Job #1234"
        buttons={[
          {
            text: "ADD ACCOUNT",
            tone: "success",
            onClick: undefined,
            icon: "link",
          },
          {
            text: "ADD STAFF",
            tone: "success",
            onClick: undefined,
            icon: "link",
          },
          {
            text: "APPROVE",
            tone: "success",
            onClick: undefined,
            icon: "link",
          },
          {
            text: "DELETE",
            tone: "success",
            onClick: undefined,
            icon: "link",
          },
        ]}
        date={"Jan 6 2024 4:20 PM"}
        badges={[
          {
            icon: "delivery",
            text: "Pressing",
            tone: "info",
          },
          {
            icon: "fire",
            text: "Priority",
            tone: "critical",
          },
        ]}
        staff={[
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
        ]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <ItemsList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <ItemDisplay is_create={false} />
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];

const items = [
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
];
