import {IconTypes} from "@/lib/types/shared";
import {Icon} from "./Icon";
import styles from "./Shared.module.css";

type BadgeProps = {
  icon: IconTypes;
  text: string;
  tone: "critical" | "success" | "info" | "magic";
};

export const Badge = ({icon, text, tone}: BadgeProps) => {
  return (
    <div className={styles.badge} style={{backgroundColor: bkgColor(tone)}}>
      <Icon icon={icon} tone={tone} />
      <span
        style={{
          color: fontColor(tone),
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const fontColor = (tone: "critical" | "success" | "info" | "magic") => {
  switch (tone) {
    case "critical":
      return "var(--error-color)";

    case "info":
      return "var(--info-color)";

    case "magic":
      return "var(--magic-color)";

    case "success":
      return "var(--success-color)";

    default:
      break;
  }
};

export const bkgColor = (tone: "critical" | "success" | "info" | "magic") => {
  switch (tone) {
    case "critical":
      return "var(--error-bkg)";

    case "info":
      return "var(--info-bkg)";

    case "magic":
      return "var(--magic-bkg)";

    case "success":
      return "var(--success-bkg)";

    default:
      break;
  }
};
