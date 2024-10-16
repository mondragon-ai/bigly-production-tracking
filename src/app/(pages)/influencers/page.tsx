"use client";
import useInfluencers from "@/lib/hooks/useInfluencers";
import PageHeader from "@/components/shared/PageHeader";
import styles from "../../../components/Shared.module.css";
import {SkeletonList} from "@/components/skeleton/SkeletonList";
import {InfluencersItems} from "@/components/jobs.tsx/InfluencersItems";

export default function Influencers() {
  const {influencers, loading} = useInfluencers();

  return (
    <div className={styles.page}>
      <PageHeader
        title="Bigly Form"
        loading={loading}
        buttons={[]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section style={{width: "100%", paddingRight: "10px"}}>
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <InfluencersItems headers={headers} items={influencers} />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Email", "Number", "Note"];
