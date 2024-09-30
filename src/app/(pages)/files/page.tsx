import {Button} from "@/components/shared/Button";
import styles from "../../../components/Shared.module.css";
import {FileList} from "@/components/shared/FileList";
import {Badge} from "@/components/shared/Badge";
import {FileDetail} from "@/components/files/FileDetail";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <FileList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <FileDetail />
        </section>
      </main>
    </div>
  );
}

const headers = ["Name", "Status", "Date Added"];
const items = [
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Pick-file.csv",
    status: "M",
    added: "Jan 6 2024 4:20 PM",
  },
];

export const Header = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1>Pick List Files</h1>
        </div>
      </div>
      <div className={styles.right}>
        <Button
          thin={true}
          text="UPLOAD FILE"
          tone={"success"}
          align={"center"}
        />
      </div>
    </header>
  );
};