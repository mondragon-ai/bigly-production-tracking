import {Button} from "@/components/shared/Button";
import styles from "../../../components/Shared.module.css";
import {CustomTable} from "@/components/shared/CustomTable";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";
import {Avatar} from "@/components/shared/Avatar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <CustomTable />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <ItemDisplay />
        </section>
      </main>
    </div>
  );
}

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
          thin={false}
          text="ADD STAFF"
          tone={"success"}
          align={"center"}
        />
        <Button thin={false} text="APPROVE" tone={"success"} align={"center"} />
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
