import {IconTypes} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {Icon} from "./Icon";

type ButtonProps = {
  text: string;
  thin: boolean;
  tone: "descructive" | "success" | "";
  align: "left" | "center";
  icon?: IconTypes;
};
export const Button = ({
  text,
  thin,
  tone,
  align = "center",
  icon,
}: ButtonProps) => {
  const t = tone == "success" ? "success" : "critical";
  return (
    <button
      className={styles.btnBase}
      style={{
        fontWeight: thin ? 500 : 600,
        fontSize: thin ? "14px" : "18px",
        padding: thin ? "0 5px" : "0 18px",
        lineHeight: thin ? "18px" : "50px",
        backgroundColor: bkgColor(tone),
        textAlign: align,
        justifyContent: align == "center" ? "center" : "flex-start",
      }}
      role="button"
    >
      {icon && <Icon icon={icon} tone={t} />}
      {text}
    </button>
  );
};

export const fontColor = (tone: "descructive" | "success" | "") => {
  switch (tone) {
    case "descructive":
      return "var(--error-color)";

    case "success":
      return "var(--success-color)";

    default:
      break;
  }
};

export const bkgColor = (tone: "descructive" | "success" | "") => {
  switch (tone) {
    case "descructive":
      return "var(--destructive-accent)";

    case "success":
      return "var(--main-accent)";

    default:
      break;
  }
};
