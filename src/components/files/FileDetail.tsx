import {FileDetail} from "@/lib/types/files";
import {Button} from "../shared/Button";
import styles from "./Files.module.css";

export const FileDetailCard = ({
  file_detail,
  handleDeleteFile,
}: {
  file_detail: FileDetail;
  handleDeleteFile: (id: string) => void;
}) => {
  return (
    <div className={styles.fileDetailWrapper}>
      <header>
        <h5>{file_detail.name}</h5>
        <div>
          {file_detail.status == "pending" && (
            <Button
              text={"Generate Jobs"}
              thin={true}
              icon="wand"
              tone={"success"}
              align={"center"}
            />
          )}
          <Button
            onClick={() => handleDeleteFile(file_detail.id)}
            text={"Delete"}
            thin={true}
            tone={"descructive"}
            align={"center"}
            icon="trash"
          />
        </div>
      </header>

      <div className={styles.fileTableWrapper}>
        <table>
          <thead>
            <tr>
              {headers &&
                headers.map((title, index) => {
                  return (
                    <th
                      key={index}
                      style={{
                        textAlign: "left",
                        padding: index == 0 ? "0 1rem" : "7px 0",
                        verticalAlign: "middle",
                      }}
                    >
                      {title}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {file_detail.csv_data.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    textAlign: "left",
                    padding: "0 1rem",
                    verticalAlign: "middle",
                  }}
                >
                  {item.print_sku}
                </td>
                <td>{item.store_sku}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headers = ["Print SKU", "Item SKU", "Type"];
