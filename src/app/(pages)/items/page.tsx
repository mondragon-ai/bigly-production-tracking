"use client";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import styles from "../../../components/Shared.module.css";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";
import PageHeader from "@/components/shared/PageHeader";
import useItems from "@/lib/hooks/useItems";
import {StartingState} from "@/components/images/StartingState";

export default function Items() {
  const {items, item, loading, handleSelectItem, deleteItem} = useItems();

  return (
    <div className={styles.page}>
      <PageHeader
        title="Custom Items"
        loading={false}
        buttons={[]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <ItemsList
            headers={headers}
            items={items}
            handleSelectItem={handleSelectItem}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {item ? (
            <ItemDisplay is_create={true} onClick={deleteItem} item={item} />
          ) : loading == "loading" ? (
            <p>loading</p>
          ) : (
            <StartingState type="item" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];
