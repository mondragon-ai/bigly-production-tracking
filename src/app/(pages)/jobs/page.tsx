import {StageBoard} from "@/components/jobs.tsx/StageBoard";
import styles from "../../../components/Shared.module.css";

export default function Jobs() {
  return (
    <div className={styles.page}>
      <Header />
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
            stages.map((s) => {
              return <StageBoard title={s.title} jobs={jobs} stage={s.stage} />;
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
    title: "Complete",
    stage: "complete",
  },
];

export const Header = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1>Current Job</h1>
        </div>
      </div>
      <div className={styles.right}></div>
    </header>
  );
};

const jobs = [
  {
    id: "1",
    job_name: "",
    is_priority: false,
    stage: "pending",
    staff: ["Scrub", "Jack", "Jill", "Diddy"],
    time_started: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0.5,
      cutting: 0.2,
      staging: 0.5,
      pressing: 1.1,
      double: 0.3,
      folding: 0.1,
    },
    created_at: "",
  },
  {
    id: "1",
    job_name: "",
    is_priority: false,
    stage: "pending",
    staff: ["Scrub", "Jack", "Jill", "Diddy"],
    time_started: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0.5,
      cutting: 0.2,
      staging: 0.5,
      pressing: 1.1,
      double: 0.3,
      folding: 0.1,
    },
    created_at: "",
  },
  {
    id: "1",
    job_name: "",
    is_priority: false,
    stage: "printing",
    staff: ["Scrub", "Jack", "Jill", "Diddy"],
    time_started: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0.5,
      cutting: 0.2,
      staging: 0.5,
      pressing: 1.1,
      double: 0.3,
      folding: 0.1,
    },
    created_at: "",
  },
  {
    id: "1",
    job_name: "",
    is_priority: false,
    stage: "pressing",
    staff: ["Scrub", "Jack", "Jill", "Diddy"],
    time_started: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    time_ended: {
      pending: "",
      printing: "",
      cutting: "",
      staging: "",
      pressing: "",
      double: "",
      folding: "",
    },
    error_rate: {
      pending: 0,
      printing: 0.5,
      cutting: 0.2,
      staging: 0.5,
      pressing: 1.1,
      double: 0.3,
      folding: 0.1,
    },
    created_at: "",
  },
];
