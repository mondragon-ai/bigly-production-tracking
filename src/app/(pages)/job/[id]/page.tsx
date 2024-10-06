"use client";
import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import {JobDocument} from "@/lib/types/jobs";
import {BadgeType} from "@/lib/types/shared";
import {useParams} from "next/navigation";
import useJob from "@/lib/hooks/useJob";
import {StartingState} from "@/components/images/StartingState";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";

export default function JobDetail() {
  const params = useParams<{id: string}>();
  const {job, loading, selectItem, item, deleteJob} = useJob(params.id);

  const handleDelete = async () => {
    console.log({delete: params.id});
    await deleteJob(params.id);
  };

  const handleReportError = (id: string) => {
    console.log({error: id});
  };

  const handleSelectItem = (id: string) => {
    console.log({select: id});
    selectItem(id);
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
        has_qr_code={
          "https://firebasestorage.googleapis.com/v0/b/bigly-server.appspot.com/o/images%2Fuploads%2F1727879269134_Aundrel%20PAST%20Winner%20Banner%20Email.png?alt=media&token=68373442-084a-4418-95d8-9e9096cac4ca"
        }
        title={`Job #${job.job_name}`}
        buttons={[
          {
            text: "DELETE",
            tone: "descructive",
            onClick: handleDelete,
            icon: "trash",
          },
        ]}
        date={job.created_at}
        badges={badges(job)}
        staff={job.staff}
      />
      <main>
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
              is_create={false}
              onClick={handleReportError}
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
