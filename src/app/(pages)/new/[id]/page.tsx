"use client";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";
import {StartingState} from "@/components/images/StartingState";
import {formatTimestamp} from "@/lib/utils/converter.tsx/time";
import styles from "../../../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import {ErrorIcon} from "@/components/shared/ErrorIcon";
import PageHeader from "@/components/shared/PageHeader";
import {BadgeType, IconTypes} from "@/lib/types/shared";
import {AddStaff} from "@/components/shared/AddStaff";
import {useGlobalContext} from "@/lib/store/context";
import {JobDocument} from "@/lib/types/jobs";
import {useParams} from "next/navigation";
import useJob from "@/lib/hooks/useJob";
import {useState} from "react";

export default function JobDetail() {
  const {globalState} = useGlobalContext();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modal, openModal] = useState<boolean>(false);
  const params = useParams<{id: string}>();
  const {
    job,
    selectItem,
    item,
    loading,
    deleteJob,
    removeItem,
    approveJob,
    error,
    setError,
  } = useJob(params.id);

  const handleDeleteJob = async () => {
    console.log({delete: params.id});
    await deleteJob(params.id);
  };

  const handleRemoveItem = async (id: string) => {
    console.log({remove: id});
    setError("Couldn't remove");
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

  const buttons = () => {
    let buttons: {
      onClick: ((e: any) => void) | undefined;
      text: string;
      tone: "" | "success" | "descructive";
      icon: IconTypes;
    }[] = [
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
    ];

    if (globalState.user.role == "staff") {
      buttons = [];
    }
    return buttons;
  };

  return (
    <div className={styles.page}>
      {error && <ErrorIcon text={error} closeError={() => setError(null)} />}
      <PageHeader
        has_qr_code={""}
        title={`Job #${job?.job_name || ""}`}
        set_loaders={true}
        loading={loading}
        buttons={buttons()}
        openStaff={openStaff}
        date={formatTimestamp(job?.created_at || 0)}
        badges={badges(job)}
        staff={job?.staff || []}
      />
      <main>
        {modal && (
          <AddStaff
            can_select={false}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            staff={job?.staff || []}
          />
        )}
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
              is_create={true}
              onClick={handleRemoveItem}
              item={item}
              loading={loading}
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
