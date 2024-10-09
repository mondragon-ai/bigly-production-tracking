import {FetchAndParsedCleanCSV} from "@/lib/types/files";
import {Button} from "../shared/Button";
import styles from "./Files.module.css";
import {formatWithCommas} from "@/lib/utils/converter.tsx/numbers";
import {truncateString} from "@/lib/utils/converter.tsx/text";

export const FileDetailCard = ({
  file_detail,
  handleDeleteFile,
  handleGenerate,
}: {
  file_detail: FetchAndParsedCleanCSV;
  handleDeleteFile: (id: string) => void;
  handleGenerate: (id: string) => void;
}) => {
  return (
    <div className={styles.fileDetailWrapper}>
      <header>
        <h5>
          {truncateString(file_detail.name, 20)} -{" "}
          {formatWithCommas(file_detail.cleaned.length) || 0} items
        </h5>
        <div>
          {file_detail.status == "pending" && (
            <Button
              onClick={() => handleGenerate(file_detail.id)}
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
                        padding:
                          index == 0 || index == headers.length - 1
                            ? "0 1rem"
                            : "7px 0",
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
            {file_detail &&
              file_detail.cleaned.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      textAlign: "left",
                      padding: "0 1rem",
                      verticalAlign: "middle",
                    }}
                  >
                    {item.base_sku}
                  </td>
                  <td>{item.item_sku}</td>
                  <td>{item.type}</td>
                  <td>{item.color}</td>
                  <td
                    style={{
                      textAlign: "left",
                      padding: "0 1rem",
                      verticalAlign: "middle",
                    }}
                  >
                    {item.size}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const headers = ["Print SKU", "Item SKU", "Type", "Color", "Size"];
