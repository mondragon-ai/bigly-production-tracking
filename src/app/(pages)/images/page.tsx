"use client";
import {ImageDetail} from "@/components/images/ImageDetail";
import styles from "../../../components/Shared.module.css";
import PageHeader from "@/components/shared/PageHeader";
import {ImageList} from "@/components/images/ImageList";
import useImageUpload from "@/lib/hooks/useImages";
import {StartingState} from "@/components/images/StartingState";
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";

export default function Images() {
  const {
    images,
    loading,
    error,
    uploadImage,
    img_detail,
    setImageCard,
    deleteImage,
  } = useImageUpload();

  const handleImageUpload = async (file: File) => {
    await uploadImage(file);
  };

  const handleImageSelect = (id: string) => {
    setImageCard(id);
  };

  const handleDeleteImage = (id: string) => {
    deleteImage(id);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        loading={loading == "posting"}
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
          {loading == "loading" ? (
            <SkeletonList width={100} />
          ) : (
            <ImageList
              handleImageSelect={handleImageSelect}
              headers={headers}
              items={images}
            />
          )}
        </section>
        <section style={{width: "45%", paddingLeft: "10px"}}>
          {img_detail ? (
            <ImageDetail
              img_detail={img_detail}
              handleDeleteImage={handleDeleteImage}
            />
          ) : loading == "requesting" || loading == "loading" ? (
            <SkeletonDetail width={100} />
          ) : (
            <StartingState type="image" />
          )}
        </section>
      </main>
    </div>
  );
}

const headers = ["File Name", "Date Added", "Link"];
