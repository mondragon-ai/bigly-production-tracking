import {IconTypes} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {Button} from "./Button";
import {Icon} from "./Icon";

type ApproveModalProps = {
  title: string;
  info: string;
  action: string;
  tone: "descructive" | "success";
  icon: IconTypes;
  closeModal: () => void;
  onClick: () => void;
};

export const ApproveModal = ({
  title,
  info,
  action,
  tone,
  icon,
  closeModal,
  onClick,
}: ApproveModalProps) => {
  return (
    <div className={styles.modalBkg}>
      <div className={styles.modal}>
        <header onClick={closeModal}>
          <h5>{title}</h5>
          <Icon icon={"close"} tone={"magic"} />
        </header>
        <span>{info}</span>
        <footer>
          <Button
            text={"Close"}
            thin={true}
            tone={"success"}
            align={"center"}
            onClick={closeModal}
          />
          <Button
            onClick={onClick}
            text={action}
            thin={true}
            tone={tone}
            align={"center"}
            icon={icon}
          />
        </footer>
      </div>
    </div>
  );
};
