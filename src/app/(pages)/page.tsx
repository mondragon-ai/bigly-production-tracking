import {Button} from "@/components/shared/Button";
import styles from "../../components/Shared.module.css";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {Badge} from "@/components/shared/Badge";
import {Avatar} from "@/components/shared/Avatar";
import {ItemsList} from "@/components/jobs.tsx/ItemsList";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <ItemsList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <ItemDisplay is_create={false} />
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

const renderBody = (items: any[]) => {
  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={item.id}>
          <td>{item.sku}</td>
          <td>{item.size}</td>
          <td>{item.color}</td>
          <td>
            <Badge icon={"store"} text={"success"} tone={"success"} />
          </td>
          <td>{item.type}</td>
          <td>{item.store}</td>
        </tr>
      ))}
    </tbody>
  );
};

export const Header = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1>Job #1234</h1>
          <Badge icon={"delivery"} text={"Pressing"} tone={"info"} />
          <Badge icon={"fire"} text={"Priority"} tone={"critical"} />
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
          thin={false}
          text="DELETE"
          tone={"descructive"}
          align={"center"}
          icon="trash"
        />
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