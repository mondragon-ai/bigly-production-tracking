import {Button} from "@/components/shared/Button";
import styles from "../../../components/Shared.module.css";
import {ImageList} from "@/components/images/ImageList";
import {ImageDetail} from "@/components/images/ImageDetail";

export default function Images() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <section style={{width: "55%", paddingRight: "10px"}}>
          <ImageList headers={headers} items={items} />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          <ImageDetail />
        </section>
      </main>
    </div>
  );
}

const headers = ["File Name", "Date Added", "Link"];
const items = [
  {
    id: "1",
    image: "",
    name: "Pick-file.csv",
    added: "Jan 6 2024 4:20 PM",
    link: "",
  },
  {
    id: "1",
    image: "",
    name: "Pick-file.csv",
    added: "Jan 6 2024 4:20 PM",
    link: "",
  },
  {
    id: "1",
    image: "",
    name: "Pick-file.csv",
    added: "Jan 6 2024 4:20 PM",
    link: "",
  },
  {
    id: "1",
    image: "",
    name: "Pick-file.csv",
    added: "Jan 6 2024 4:20 PM",
    link: "",
  },
];

export const Header = () => {
  return (
    <header className={styles.pageHeaderWrapper}>
      <div className={styles.left}>
        <div>
          <h1>Image List</h1>
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
