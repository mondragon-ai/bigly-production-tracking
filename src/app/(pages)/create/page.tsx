"use client";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {Items} from "@/lib/types/jobs";
import {useJobCreate} from "@/lib/hooks/useJobCreate";

export default function Create() {
  const {
    stores,
    job,
    setJob,
    loading,
    handleApproveJob,
    handleCreateItem,
    handleSelectItem,
  } = useJobCreate();

  const handleAddStaff = () => {
    alert("READY TO OPEN STAFF");
    return;
  };

  const openAddItem = () => {
    alert("READY TO OPEN ADD ITEM");
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
            icon: "add-user",
          },
          {
            text: "ADD ITEM",
            tone: "success",
            onClick: openAddItem,
            icon: "wand",
          },
          {
            text: "APPROVE",
            tone: "success",
            onClick: handleApproveJob,
            icon: "badge-check",
          },
        ]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <AddItems handleSelectItem={handleSelectItem} stores={stores} />
          <ItemsList
            headers={headers}
            items={[] as Items[]}
            handleSelectItem={() => {}}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <AddItem handleCreateItem={handleCreateItem} />
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];
