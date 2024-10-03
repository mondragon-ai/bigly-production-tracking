"use client";
import {StartingState} from "@/components/images/StartingState";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {useJobCreate} from "@/lib/hooks/useJobCreate";
import {useState} from "react";
import {Items} from "@/lib/types/jobs";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";

export default function Create() {
  const [createItem, openItem] = useState(true);
  const [item, setItem] = useState<null | Items>(null);
  const {
    stores,
    job,
    loading,
    handleApproveJob,
    handleCreateItem,
    removeItem,
    handleSelectItem,
  } = useJobCreate();

  const handleAddStaff = () => {
    alert("READY TO OPEN STAFF");
    return;
  };

  const openAddItem = () => {
    openItem(true);
    setItem(null);
    return;
  };

  const handleViewItem = (id: string) => {
    openItem(false);
    const item = job.items.find((i) => i.id == id);
    if (item) setItem(item);
  };

  const handleRemoveItem = (id: string) => {
    openItem(true);
    setItem(null);
    removeItem(id);
  };

  const approveJob = () => {
    if (job.items.length !== 0) {
      handleApproveJob();
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title={"Create Job"}
        date={"Today"}
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
            onClick: approveJob,
            icon: "badge-check",
          },
        ]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <AddItems handleSelectItem={handleSelectItem} stores={stores} />
          <ItemsList
            headers={headers}
            items={job.items}
            handleSelectItem={handleViewItem}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {createItem ? (
            <AddItem handleCreateItem={handleCreateItem} />
          ) : item ? (
            <ItemDisplay
              is_create={true}
              onClick={handleRemoveItem}
              item={item}
            />
          ) : (
            <StartingState type="item" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];
