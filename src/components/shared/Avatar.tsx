import {Staff} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {getInitials} from "@/lib/utils/converter.tsx/text";

export const Avatar = ({staff}: {staff: Staff}) => {
  if (!staff) return;

  return (
    <div className={styles.avatar}>
      <h6>{getInitials(staff?.name || "")}</h6>
    </div>
  );
};
