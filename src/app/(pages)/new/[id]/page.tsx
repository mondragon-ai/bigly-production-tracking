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

export default function Confirm() {
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
    alert("READY TO ADD");
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
            text: "ADD STAFF",
            tone: "success",
            onClick: openStaff,
            icon: "link",
          },
          {
            text: "APPROVE",
            tone: "success",
            onClick: handleApprove,
            icon: "badge-check",
          },
          {
            text: "DELETE",
            tone: "descructive",
            onClick: handleDeleteJob,
            icon: "trash",
          },
        ]}
        date={job.created_at}
        badges={badges(job)}
        staff={job.staff}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <ItemsList
            headers={headers}
            items={job.items}
            handleSelectItem={handleSelectItem}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item ? (
            <ItemDisplay
              is_create={true}
              onClick={handleRemoveItem}
              item={item}
            />
          ) : loading == "requesting" ? (
            <p>loading</p>
          ) : (
            <StartingState type="item" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];
