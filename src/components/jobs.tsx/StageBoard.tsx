import {JobDocument} from "@/lib/types/jobs";
import {Avatar} from "../shared/Avatar";
import {Badge} from "../shared/Badge";
import styles from "./Jobs.module.css";
import {getHoursDifference} from "@/lib/utils/converter.tsx/time";
import {getStateErrorRate} from "@/lib/utils/converter.tsx/analytics";
import {SkeletonBadge, SkeletonText} from "../skeleton/SkeletonText";

type StageBoardProps = {
  title: string;
  jobs: any[];
  stage: string;
  loading: boolean;
};

export const StageBoard = ({title, jobs, stage, loading}: StageBoardProps) => {
  return (
    <div className={styles.kanbanBoard}>
      <header>
        <h4>
          {title} -{" "}
          {jobs.reduce((prev, curr) => {
            if (curr.stage === stage) {
              return prev + 1;
            }
            return prev;
          }, 0)}
        </h4>
      </header>
      <main>
        {jobs && !loading
          ? jobs.map((job, i) => {
              if (job.stage == stage) {
                return <Job key={i} job={job} />;
              }
            })
          : jobs.map((job, i) => {
              if (job.stage == stage) {
                return <JobSkeleton key={i} />;
              }
            })}
      </main>
    </div>
  );
};

const loading = ["", "", ""];

export const Job = ({job}: {job: JobDocument}) => {
  const href = job.stage == "pending" ? `/new/${job.id}` : `/job/${job.id}`;
  return (
    <a href={href} className={styles.box}>
      <header>
        <h5>Job #{job.job_name}</h5>
        <Badge
          icon={"fire"}
          text={job.is_priority ? "Priority" : "Normal"}
          tone={job.is_priority ? "critical" : "info"}
        />
      </header>
      <div>
        {job.staff &&
          job.staff.map((s, i) => {
            if (i <= 4) {
              return <Avatar staff={s} key={i} />;
            }
          })}
        {job.staff.length > 4 && <p>{`+${job.staff.length - 4}`}</p>}
      </div>
      <footer>
        <Badge
          icon={"hour_glass"}
          text={`${getHoursDifference(job.time_started.pending)}h`}
          tone={"magic"}
        />
        <Badge
          icon={"rejected"}
          text={`${getStateErrorRate(job, job.stage)}`}
          tone={"critical"}
        />
      </footer>
    </a>
  );
};

export const JobSkeleton = () => {
  return (
    <a href={"#"} className={styles.box}>
      <header>
        <SkeletonText width={40} header={true} />
        <SkeletonBadge />
      </header>
      <div>
        <Avatar staff={null} />
        <Avatar staff={null} />
        <Avatar staff={null} />
      </div>
      <footer>
        <SkeletonBadge />
        <SkeletonBadge />
      </footer>
    </a>
  );
};
