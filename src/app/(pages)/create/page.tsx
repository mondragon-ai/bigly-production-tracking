"use client";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {AddItem} from "@/components/jobs.tsx/AddItem";

export default function Create() {
  const handleAddStaff = () => {
    // b.text
    return;
  };
  return (
    <div className={styles.page}>
      <PageHeader
        title={"Job #1234"}
        date={"Jan 6 2024 4:20 PM"}
        badges={[]}
        staff={[
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
          {name: "Angel", email: "angel.@goigly.com", id: "1"},
        ]}
        buttons={[
          {
            text: "ADD STAFF",
            tone: "success",
            onClick: handleAddStaff,
            icon: "link",
          },
          {
            text: "ADD ITEM",
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
        ]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <AddItems />
          <ItemsList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {/* <ItemDisplay is_create={true} /> */}
          <AddItem />
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
