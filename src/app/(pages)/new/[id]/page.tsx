"use client";
import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import {useParams} from "next/navigation";
import useJob from "@/lib/hooks/useJob";
import {JobDocument} from "@/lib/types/jobs";
import {BadgeType} from "@/lib/types/shared";
import {StartingState} from "@/components/images/StartingState";
import {useState} from "react";
import {AddStaff} from "@/components/shared/AddStaff";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";

export default function Confirm() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, openModal] = useState<boolean>(false);
  const params = useParams<{id: string}>();
  const {job, selectItem, item, loading, deleteJob, removeItem, approveJob} =
    useJob(params.id);

  const handleDeleteJob = async () => {
    console.log({delete: params.id});
    await deleteJob(params.id);
  };

  const handleRemoveItem = async (id: string) => {
    console.log({remove: id});
    await removeItem(id);
  };

  const handleSelectItem = (id: string) => {
    console.log({select: id});
    selectItem(id);
  };

  const handleApprove = async () => {
    console.log({approve: params.id});
    await approveJob(params.id);
  };

  const openStaff = () => {
    openModal(!modal);
  };

  const badges = (job: JobDocument) => {
    const badge_list: BadgeType[] = [
      {
        icon: "delivery",
        text: job.stage,
        tone: "info",
      },
    ];
    if (job.is_priority) {
      badge_list.push({
        icon: "fire",
        text: "Priority",
        tone: "critical",
      });
    }
    return badge_list;
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Job #1234"
        loading={loading == "posting"}
        buttons={[
          {
            text: "DELETE",
            tone: "descructive",
            onClick: handleDeleteJob,
            icon: "trash",
          },
          {
            text: "APPROVE",
            tone: "success",
            onClick: handleApprove,
            icon: "badge-check",
          },
        ]}
        openStaff={openStaff}
        date={job.created_at}
        badges={badges(job)}
        staff={job.staff}
      />
      <main>
        {modal && (
          <AddStaff
            can_select={false}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            staff={job.staff}
          />
        )}
        <section style={{width: "55%", paddingRight: "10px"}}>
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <ItemsList
              headers={headers}
              items={job.items}
              handleSelectItem={handleSelectItem}
            />
          )}
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item ? (
            <ItemDisplay
              is_create={true}
              onClick={handleRemoveItem}
              item={item}
            />
          ) : loading == "requesting" || loading == "loading" ? (
            <SkeletonDetail width={100} />
          ) : (
            <StartingState type="item" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];
