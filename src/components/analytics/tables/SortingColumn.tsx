import {Dispatch, SetStateAction} from "react";
import styles from "../../Shared.module.css";
import {Icon} from "@/components/shared/Icon";

type Column = {name: string; fromHighest: boolean};
type SortingColumnProps = {
  name: string;
  column: Column;
  setColumn: Dispatch<SetStateAction<Column>>;
};

export const SortingColumn = ({
  name,
  column,
  setColumn,
}: SortingColumnProps) => {
  const isSelected = column.name === name;
  const ascending = column.fromHighest;

  const handleSort = () => {
    setColumn((prev) =>
      prev.name === name
        ? {...prev, fromHighest: !prev.fromHighest}
        : {name, fromHighest: true},
    );
  };

  return (
    <div className={styles.sortingColumn} onClick={handleSort}>
      <Icon
        icon="angle-up"
        tone={ascending && isSelected ? "magic" : "info"}
        size={10}
      />
      <Icon
        icon="angle-down"
        tone={!ascending && isSelected ? "magic" : "info"}
        size={10}
      />
    </div>
  );
};
