"use client";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import {StartingState} from "@/components/images/StartingState";
import useInventory from "@/lib/hooks/useInventory";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";

export default function Inventory() {
  const {inventory, item, loading, handleSelectItem, deleteItem} =
    useInventory();

  return (
    <div className={styles.page}>
      <PageHeader
        title="Bigly Inventory"
        loading={loading}
        buttons={[]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <ItemsList
              is_inventory={true}
              headers={headers}
              items={inventory}
              handleSelectItem={handleSelectItem}
            />
          )}
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item ? (
            <ItemDisplay
              is_create={true}
              onClick={deleteItem}
              item={item}
              has_qr_code="https://firebasestorage.googleapis.com/v0/b/bigly-server.appspot.com/o/images%2Fuploads%2F1727879269134_Aundrel%20PAST%20Winner%20Banner%20Email.png?alt=media&token=68373442-084a-4418-95d8-9e9096cac4ca"
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

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store", "Qty"];
