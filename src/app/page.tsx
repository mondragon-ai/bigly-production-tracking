import {Button} from "@/components/shared/Button";
import styles from "../components/Shared.module.css";
import {CustomTable} from "@/components/shared/CustomTable";
import {ItemDisplay} from "@/components/jobs.tsx/ItemDisplay";

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
        <h1>Job #1234</h1>
        <span>Jan 6 2024 4:20 PM</span>
      </div>
      <div className={styles.right}>
        <Button thin={false} text="ADD STAFF" />
        <Button thin={false} text="APPROVE" />
      </div>
    </header>
  );
};
