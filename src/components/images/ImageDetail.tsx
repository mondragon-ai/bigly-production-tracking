import Image from "next/image";
import {Button} from "../shared/Button";
import styles from "./Images.module.css";
import {ImageDocument} from "@/lib/types/images";

export const ImageDetail = ({
  img_detail,
  handleDeleteImage,
}: {
  img_detail: ImageDocument;
  handleDeleteImage: (id: string) => void;
}) => {
  return (
    <div className={styles.imageDetailWrapper}>
      <header>
        <h5>{img_detail.name}</h5>
        <Button
          onClick={() => handleDeleteImage(img_detail.id)}
          text={"Delete Image"}
          thin={true}
          tone={"descructive"}
          align={"left"}
          icon="trash"
        />
      </header>

      <main>
        <div className={styles.box}>
          <Image src={img_detail.url} width={500} height={500} alt={""} />
        </div>
      </main>
    </div>
  );
};
