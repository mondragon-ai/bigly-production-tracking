import styles from "./Skeleton.module.css";
import {SkeletonBadge, SkeletonText} from "./SkeletonText";

type SkeletonListProps = {
  width: number;
};

export const SkeletonList = ({width}: SkeletonListProps) => {
  return (
    <div className={styles.listWrapper}>
      <header>
        <SkeletonText width={80} header={true} />
        <SkeletonText width={80} header={true} />
        <SkeletonText width={80} header={true} />
        <SkeletonText width={80} header={true} />
        <SkeletonText width={80} header={true} />
      </header>
      <main>
        <div>
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
        </div>
        <div>
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
        </div>
        <div>
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
          <SkeletonText color="#cccccc" width={80} header={true} />
        </div>
      </main>
    </div>
  );
};

export const SkeletonDetail = ({width}: SkeletonListProps) => {
  return (
    <div className={styles.detailWrapper}>
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
