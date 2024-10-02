import {StageBoard} from "@/components/jobs.tsx/StageBoard";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {job_list} from "@/lib/data/jobs";

export default function Jobs() {
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
          {stages &&
            stages.map((s, i) => {
              return (
                <StageBoard
                  key={i}
                  title={s.title}
                  jobs={job_list}
                  stage={s.stage}
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
