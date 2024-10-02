"use client";
import {ImageDetail} from "@/components/images/ImageDetail";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {ImageList} from "@/components/images/ImageList";
import useImageUpload from "@/lib/hooks/useImages";

export default function Images() {
  const {images, loading, error, uploadImage, img_detail, setImageCard} =
    useImageUpload();

  const handleImageUpload = async (file: File) => {
    console.log("Uploaded file:", file);
    await uploadImage(file);
  };

  const handleImageSelect = (id: string) => {
    console.log({id});
    setImageCard(id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        loading={loading}
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
          <ImageList
            handleImageSelect={handleImageSelect}
            headers={headers}
            items={images}
          />
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {img_detail && <ImageDetail img_detail={img_detail} />}
        </section>
      </main>
    </div>
  );
}

const headers = ["File Name", "Date Added", "Link"];
