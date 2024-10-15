"use client";
import {StartingState} from "@/components/images/StartingState";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import PageHeader from "@/components/shared/PageHeader";
import {ErrorIcon} from "@/components/shared/ErrorIcon";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {useJobCreate} from "@/lib/hooks/useJobCreate";
import {AddStaff} from "@/components/shared/AddStaff";
import {BadgeType} from "@/lib/types/shared";
import {Items} from "@/lib/types/jobs";
import {useState} from "react";

export default function Create() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [item, setItem] = useState<null | Items>(null);
  const [modal, openModal] = useState<boolean>(false);
  const [createItem, openItem] = useState(true);
  const {
    stores,
    job,
    staff,
    loading,
    error,
    setError,
    setJob,
    removeItem,
    handleApproveJob,
    handleCreateItem,
    handleSelectItem,
  } = useJobCreate();

  const handleAddStaff = () => {
    openModal(!modal);
    return;
  };

  const handleSetPriority = () => {
    setJob((p) => p && {...p, is_priority: !p.is_priority});
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
      handleApproveJob(selectedIds);
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
      {error && (
        <ErrorIcon text={error || ""} closeError={() => setError(null)} />
      )}
      <PageHeader
        loading={loading}
        setPriority={handleSetPriority}
        title={"Create Job"}
        date={"Today"}
        badges={job.is_priority ? Priority() : []}
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
            text: "GENERATE",
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
            <AddItem handleCreateItem={handleCreateItem} loading={loading} />
          ) : item ? (
            <ItemDisplay
              is_create={true}
              onClick={handleRemoveItem}
              item={item}
              loading={loading}
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
