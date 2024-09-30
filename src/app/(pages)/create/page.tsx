import {Button} from "@/components/shared/Button";
import styles from "../../../components/Shared.module.css";
import {Avatar} from "@/components/shared/Avatar";
import {AddItems} from "@/components/jobs.tsx/AddItems";
import {AddItem} from "@/components/jobs.tsx/AddItem";
import {Badge} from "@/components/shared/Badge";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <AddItems />
          <ItemsList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {/* <ItemDisplay is_create={true} /> */}
          <AddItem />
        </section>
      </main>
    </div>
  );
}

const headers = ["SKU", "Size", "Color", "Status", "Type", "Store"];

const items = [
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
  {
    id: "1",
    sku: "SKU-DESIGN-CLR-SIZE",
    size: "M",
    color: "Black",
    status: 5,
    type: "shirt",
    store: "AJ",
  },
];

export const Header = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1>Job #1234</h1>
        </div>
        <span>Jan 6 2024 4:20 PM</span>
      </div>
      <div className={styles.right}>
        <div className={styles.staffWrapper}>
          {staff.length >= 4 && <p>{`+${staff.length - 4}`}</p>}
          {staff &&
            staff.map((s, i) => {
              if (i <= 4) {
                return <Avatar key={i} />;
              }
            })}
        </div>
        <Button
          thin={true}
          text="ADD STAFF"
          tone={"success"}
          align={"center"}
        />
        <Button thin={true} text="ADD ITEM" tone={"success"} align={"center"} />
        <Button thin={true} text="APPROVE" tone={"success"} align={"center"} />
      </div>
    </header>
  );
};

const staff = [
  {
    name: "Scrub Daddy",
    id: "1",
    email: "scrub@gobigly.com",
    stage: "printing",
    role: "admin",
  },
  {
    name: "Mia",
    id: "2",
    email: "mia@gobigly.com",
    stage: "cutting",
    role: "staff",
  },
  {
    name: "Mia",
    id: "2",
    email: "mia@gobigly.com",
    stage: "cutting",
    role: "staff",
  },
  {
    name: "Mia",
    id: "2",
    email: "mia@gobigly.com",
    stage: "cutting",
    role: "staff",
  },
  {
    name: "Mia",
    id: "2",
    email: "mia@gobigly.com",
    stage: "cutting",
    role: "staff",
  },
  {
    name: "Mia",
    id: "2",
    email: "mia@gobigly.com",
    stage: "cutting",
    role: "staff",
  },
];
