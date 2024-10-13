"use client";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";
import {StartingState} from "@/components/images/StartingState";
import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ApproveModal} from "@/components/shared/ApproveModal";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import {JobDocument} from "@/lib/types/jobs";
import {BadgeType, IconTypes} from "@/lib/types/shared";
import {useParams} from "next/navigation";
import useJob from "@/lib/hooks/useJob";
import {useState} from "react";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";

export default function JobDetail() {
  const params = useParams<{id: string}>();
  const [itemID, setItemID] = useState("");
  const [confirm, setConfirm] = useState("");
  const {
    job,
    loading,
    item,
    selectItem,
    deleteJob,
    assignStaff,
    rejectItem,
    completeStation,
  } = useJob(params.id);

  const handleDelete = async () => {
    console.log({delete: params.id});
    await deleteJob(params.id);
  };

  const openErrorModal = (id: string) => {
    console.log({error: id});
    setConfirm("CONFIRM_ERROR");
    setItemID(id);
  };

  const handleReportError = () => {
    console.log({error: itemID});
    rejectItem(itemID);
    setConfirm("");
  };

  const handleSelectItem = (id: string) => {
    console.log({select: id});
    selectItem(id);
  };

  const qr_code = `http://api.qrserver.com/v1/create-qr-code/?data=${job?.qr_code}&size=100x100`;

  const buttons = () => {
    let buttons: {
      onClick: ((e: any) => void) | undefined;
      text: string;
      tone: "" | "success" | "descructive";
      icon: IconTypes;
    }[] = [
      {
        text: "LINK STATION",
        tone: "success",
        onClick: assignStaff,
        icon: "add-user",
      },
      {
        text: "COMPLETE STATION",
        tone: "success",
        onClick: completeStation,
        icon: "badge-check",
      },
      {
        text: "DELETE",
        tone: "descructive",
        onClick: handleDelete,
        icon: "trash",
      },
    ];

    if (job?.stage == "completed") {
      buttons = [
        {
          text: "DELETE",
          tone: "descructive",
          onClick: handleDelete,
          icon: "trash",
        },
      ];
    }
    return buttons;
  };
  return (
    <div className={styles.page}>
      {confirm == "CONFIRM_ERROR" && (
        <ApproveModal
          title={"Confirm Error"}
          info={"Report error for this item"}
          action={"Report Error"}
          tone={"descructive"}
          icon={"rejected"}
          closeModal={() => setConfirm("")}
          onClick={() => handleReportError()}
        />
      )}
      <PageHeader
        has_qr_code={qr_code}
        title={`Job #${job?.job_name || ""}`}
        buttons={buttons()}
        loading={loading}
        set_loaders={true}
        date={formatTimestamp(job?.created_at || 0)}
        badges={badges(job)}
        staff={job?.staff || []}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <ItemsList
              headers={headers}
              items={job?.items || []}
              handleSelectItem={handleSelectItem}
            />
          )}
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item ? (
            <ItemDisplay
              is_create={false}
              loading={loading}
              onClick={openErrorModal}
              item={item}
            />
          ) : loading == "requesting" || loading == "loading" ? (
            <SkeletonDetail width={100} />
          ) : job && job.items.length !== 0 && !item ? (
            <ItemDisplay
              is_create={false}
              loading={loading}
              onClick={openErrorModal}
              item={job.items[0]}
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

const badges = (job: JobDocument | null) => {
  if (!job) return [];
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
