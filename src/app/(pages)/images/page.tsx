"use client";
import {ImageDetail} from "@/components/images/ImageDetail";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {ImageList} from "@/components/images/ImageList";

export default function Images() {
  const handleImageUpload = (file: File) => {
    console.log("Uploaded file:", file);
    // Handle the file upload logic here
  };
  return (
    <div className={styles.page}>
      <PageHeader
        title="Image List"
        buttons={[
          {
            text: "UPLOAD IMAGE",
            tone: "success",
            onClick: handleImageUpload,
            icon: "link",
          },
        ]}
        date={""}
        badges={[]}
        staff={[]}
      />
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
