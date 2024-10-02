"use client";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {Items} from "@/lib/types/jobs";

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
        staff={[]}
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
          <ItemsList
            headers={headers}
            items={[] as Items[]}
            handleSelectItem={() => {}}
          />
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
