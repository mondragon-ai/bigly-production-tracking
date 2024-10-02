import {Staff} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {getInitials} from "@/lib/utils/converter.tsx/text";

export const Avatar = ({staff}: {staff: Staff | null}) => {
  return (
    <div className={styles.avatar}>
      {staff ? <h6>{getInitials(staff?.name || "")}</h6> : <h6>BB</h6>}
    </div>
  );
};
