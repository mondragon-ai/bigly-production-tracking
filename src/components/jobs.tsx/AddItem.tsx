"use client";
import styles from "./Jobs.module.css";
import {Button} from "../shared/Button";
import {useState} from "react";
import {ImageFiles, Items} from "@/lib/types/jobs";
import {initalImageFiles, initialItem} from "@/lib/payloads/jobs";
import Image from "next/image";
import {Icon} from "../shared/Icon";
import {LoadingTypes} from "@/lib/types/shared";

export const AddItem = ({
  handleCreateItem,
  loading,
}: {
  loading: LoadingTypes;
  handleCreateItem: (item: Items, images: ImageFiles) => void;
}) => {
  const [isFront, setFront] = useState(false);
  const [item, setItem] = useState(initialItem());
  const [isUpload, toggleUpload] = useState(false);
  const [images, setImages] = useState<ImageFiles>(initalImageFiles());

  const handleFileChange = (event: any, type: string) => {
    const file = event.target.files[0] as File;
    if (!file) return;
    setImages((prev) => ({...prev, [type]: file}));
    const img = URL.createObjectURL(file);
    setItem((prev) => ({...prev, images: {...prev.images, [type]: img}}));
  };

  const handleImageLink = (e: any) => {
    const target = e.target;
    setItem((prev) => ({
      ...prev,
      images: {...prev.images, [target.name]: target.value},
    }));
  };

  const handleChange = (e: any) => {
    const target = e.target;
    setItem((prev) => ({...prev, [target.name]: target.value}));
  };

  const createitem = () => {
    const validate = notValid(item);
    if (validate.is_valid) {
      handleCreateItem(item, images);
    } else {
      console.error(validate.errors);
    }
  };

  return (
    <div className={styles.itemDisplayWrapper}>
      <header style={{justifyContent: "space-between"}}>
        <h4>{item.sku ? item.sku : "-"}</h4>
        <div className={styles.createHdrLeft}>
          <div>
            <span>{item.type}</span>
            <label>
              <input
                type="checkbox"
                onClick={() =>
                  setItem((prev) => ({
                    ...prev,
                    type: prev.type == "hoodie" ? "shirt" : "hoodie",
                  }))
                }
              />
              <span className={styles.fill}></span>
            </label>
          </div>
          <button
            className={styles.btn}
            onClick={() => toggleUpload(!isUpload)}
          >
            {!isUpload ? (
              <Icon icon={"link"} tone={"magic"} />
            ) : (
              <Icon icon={"upload"} tone={"magic"} />
            )}
          </button>
        </div>
      </header>

      <main>
        <div className={styles.txt}>
          <span>
            <strong>Size:</strong> {item.size ? item.size : "-"}
          </span>
          <span>
            <strong>Color:</strong> {item.color ? item.color : "-"}
          </span>
        </div>

        <div className={styles.selectWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="query">SKU</label>
            <input
              type="text"
              name="sku"
              value={item.sku}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.selectWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="query">Colors</label>
            <select id="standard-select" name="color" onChange={handleChange}>
              {colors &&
                colors.map((c, i) => {
                  return (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="query">Sizes</label>
            <select id="standard-select" name="size" onChange={handleChange}>
              {sizes &&
                sizes.map((s, i) => {
                  return (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        {isUpload ? (
          <div className={styles.box}>
            {item.images[isFront ? "front_mockup" : "back_mockup"] ? (
              <Image
                src={item.images[isFront ? "front_mockup" : "back_mockup"]}
                width={500}
                height={500}
                alt={""}
              />
            ) : (
              <div className={styles.fileUpload}>
                <h3>
                  {" "}
                  {"Click box to upload " +
                    (isFront ? "front " : "back ") +
                    "mockup"}
                </h3>
                <p>Maximun file size 10mb</p>
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      isFront ? "front_mockup" : "back_mockup",
                    )
                  }
                />
              </div>
            )}
            <button
              className={styles.toggle}
              onClick={() => setFront(!isFront)}
            >
              {isFront ? "Front" : "Back"}
            </button>
          </div>
        ) : (
          <div className={styles.selectWrapper}>
            <button className={styles.btn} onClick={() => setFront(!isFront)}>
              {isFront ? "Front" : "Back"}
            </button>
            <div className={styles.inputWrapper}>
              <label htmlFor={isFront ? "front_mockup" : "back_mockup"}>
                {isFront ? "Front Mockup" : "Back Mockup"}
              </label>
              <input
                type="text"
                name={isFront ? "front_mockup" : "back_mockup"}
                value={item.images[isFront ? "front_mockup" : "back_mockup"]}
                onChange={handleImageLink}
              />
            </div>
          </div>
        )}

        <div className={styles.column}>
          {isUpload ? (
            <div className={styles.box} style={{width: "32%"}}>
              {item.images.front ? (
                <Image
                  src={item.images.front}
                  width={500}
                  height={500}
                  alt={""}
                />
              ) : (
                <div className={styles.fileUpload}>
                  <h3> {"Click box to upload front design"}</h3>
                  <p>Maximun file size 10mb</p>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "front")}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.selectWrapper} style={{width: "32%"}}>
              <div className={styles.inputWrapper}>
                <label htmlFor="front">Front Design</label>
                <input
                  type="text"
                  name="front"
                  value={item.images.front}
                  onChange={handleImageLink}
                />
              </div>
            </div>
          )}

          {isUpload ? (
            <div className={styles.box} style={{width: "32%"}}>
              {item.images.back ? (
                <Image
                  src={item.images.back || ""}
                  width={500}
                  height={500}
                  alt={""}
                />
              ) : (
                <div className={styles.fileUpload}>
                  <h3> {"Click box to upload back design"}</h3>
                  <p>Maximun file size 10mb</p>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "back")}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.selectWrapper} style={{width: "32%"}}>
              <div className={styles.inputWrapper}>
                <label htmlFor="back">Back Design</label>
                <input
                  type="text"
                  name="back"
                  value={item.images.back}
                  onChange={handleImageLink}
                />
              </div>
            </div>
          )}

          {isUpload ? (
            <div className={styles.box} style={{width: "32%"}}>
              {item.images.sleeve ? (
                <Image
                  src={item.images.sleeve}
                  width={500}
                  height={500}
                  alt={""}
                />
              ) : (
                <div className={styles.fileUpload}>
                  <h3> {"Click box to upload sleeve design"}</h3>
                  <p>Maximun file size 10mb</p>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "sleeve")}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.selectWrapper} style={{width: "32%"}}>
              <div className={styles.inputWrapper}>
                <label htmlFor="sleeve">Sleeve Design</label>
                <input
                  type="text"
                  name="sleeve"
                  value={item.images.sleeve}
                  onChange={handleImageLink}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer>
        <Button
          loading={loading == "posting"}
          onClick={createitem}
          tone="success"
          icon="floppy"
          align="left"
          thin={true}
          text={"Create Item"}
        />
      </footer>
    </div>
  );
};

const colors = ["Red", "Black"];
const sizes = ["S", "M", "L", "XL"];

const notValid = (item: Items) => {
  const errors: string[] = [];
  if (item.sku == "") {
    errors.push("SKU is required");
  }
  if (item.size == "") {
    errors.push("Size is required");
  }
  if (item.color == "") {
    errors.push("Color is required");
  }
  if (item.images.back_mockup == "" && item.images.front_mockup == "") {
    errors.push("Mockup image is required");
  }
  return {
    errors,
    is_valid: errors.length == 0,
  };
};
