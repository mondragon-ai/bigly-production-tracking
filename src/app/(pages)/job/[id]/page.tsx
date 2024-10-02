"use client";
import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import {JobDocument} from "@/lib/types/jobs";
import {BadgeType} from "@/lib/types/shared";
import {useParams} from "next/navigation";
import useJob from "@/lib/hooks/useJob";

export default function JobDetail() {
  const params = useParams<{id: string}>();
  const {job, selectItem, item, deleteJob} = useJob(params.id);

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
          <ItemsList
            headers={headers}
            items={job.items}
            handleSelectItem={handleSelectItem}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item && (
            <ItemDisplay
              item={item}
              is_create={false}
              onClick={handleReportError}
            />
          )}
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
