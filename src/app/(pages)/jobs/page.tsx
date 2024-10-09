"use client";
import {StageBoard} from "@/components/jobs.tsx/StageBoard";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import useJobs from "@/lib/hooks/useJobs";
import {Stages} from "@/lib/types/jobs";

export default function Jobs() {
  const {jobs, loading} = useJobs();
  return (
    <div className={styles.page}>
      <PageHeader
        title="Job List"
        buttons={[]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section
          style={{
            overflowX: "scroll",
            width: "100%",
            paddingRight: "10px",
            flexDirection: "row",
          }}
        >
          {stages.map((s, i) => {
            return (
              <StageBoard
                loading={loading == "loading"}
                key={i}
                title={s.title}
                jobs={jobs}
                stage={s.stage as Stages}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}

const stages = [
  {
    title: "Pending",
    stage: "pending",
  },

  {
    title: "Printing",
    stage: "printing",
  },
  {
    title: "Cutting",
    stage: "cutting",
  },
  {
    title: "Staging",
    stage: "staging",
  },
  {
    title: "Pressing",
    stage: "pressing",
  },
  {
    title: "Double Pressing",
    stage: "double",
  },
  {
    title: "Folding",
    stage: "folding",
  },
  {
    title: "Completed",
    stage: "completed",
  },
];
