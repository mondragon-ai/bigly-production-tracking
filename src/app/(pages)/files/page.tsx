import {Button} from "@/components/shared/Button";
import styles from "../../../components/Shared.module.css";
import {FileList} from "@/components/shared/FileList";
import {FileDetail} from "@/components/files/FileDetail";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export default function Files() {
  return (
    <div className={styles.page}>
      <CustomHeader />
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

const CustomHeader = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1 className={geistSans.className}>Pick List Files</h1>
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
