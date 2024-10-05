"use client";
import {StartingState} from "@/components/images/StartingState";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {useJobCreate} from "@/lib/hooks/useJobCreate";
import {AddStaff} from "@/components/shared/AddStaff";
import {Items} from "@/lib/types/jobs";
import {useState} from "react";
import {BadgeType} from "@/lib/types/shared";

export default function Create() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, openModal] = useState<boolean>(false);
  const [priority, setPriority] = useState<boolean>(false);
  const [createItem, openItem] = useState(true);
  const [item, setItem] = useState<null | Items>(null);
  const {
    stores,
    job,
    staff,
    loading,
    handleApproveJob,
    handleCreateItem,
    removeItem,
    handleSelectItem,
  } = useJobCreate();

  const handleAddStaff = () => {
    openModal(!modal);
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

  const Priority = (): BadgeType[] => {
    return [
      {
        icon: "fire",
        text: "Priority",
        tone: "critical",
      },
    ];
  };

  return (
    <div className={styles.page}>
      <PageHeader
        setPriority={setPriority}
        title={"Create Job"}
        date={"Today"}
        badges={priority ? Priority() : []}
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
        {modal && (
          <AddStaff
            can_select={true}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            staff={staff}
          />
        )}
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
