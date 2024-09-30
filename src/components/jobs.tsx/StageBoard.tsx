import {Avatar} from "../shared/Avatar";
import {Badge} from "../shared/Badge";
import styles from "./Jobs.module.css";

type StageBoardProps = {
  title: string;
  jobs: any[];
  stage: string;
};

export const StageBoard = ({title, jobs, stage}: StageBoardProps) => {
  return (
    <div className={styles.kanbanBoard}>
      <header>
        <h4>{title} - 5</h4>
      </header>
      <main>
        {jobs &&
          jobs.map((job, i) => {
            if (job.stage == stage) {
              return <Job key={i} job={job} />;
            }
          })}
      </main>
    </div>
  );
};

export const Job = ({job}: {job: any}) => {
  const href = job.stage == "pending" ? `/new/${job.id}}` : `/job/${job.id}}`;
  return (
    <a href={href} className={styles.box}>
      <header>
        <h5>Job #1234</h5>
        <Badge icon={"fire"} text={"Priority"} tone={"critical"} />
      </header>
      <div>
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <p>+ 2</p>
      </div>
      <footer>
        <Badge icon={"hour_glass"} text={"1.5h"} tone={"magic"} />
        <Badge icon={"rejected"} text={"1.1%"} tone={"critical"} />
      </footer>
    </a>
  );
};
