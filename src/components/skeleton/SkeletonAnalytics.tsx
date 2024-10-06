import styles from "./Skeleton.module.css";
import {SkeletonBadge, SkeletonText} from "./SkeletonText";

type SkeletonListProps = {
  width: number;
};

export const SkeletonAnalytic = ({width}: SkeletonListProps) => {
  return (
    <div className={styles.analyticWrapper} style={{width: `${width}%`}}>
      <header>
        <div>
          <SkeletonText width={80} header={true} />
          <SkeletonBadge />
        </div>
        <SkeletonText color="#cccccc" width={30} header={true} />
      </header>
      <main>
        <div></div>
      </main>
    </div>
  );
};
