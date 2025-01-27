"use client";
import {constGetCurrentMonth} from "@/lib/utils/converter.tsx/time";
import styles from "../Shared.module.css";
import {Button} from "../shared/Button";
import {useState} from "react";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";

export const BiglyGoalsCard = ({width}: {width: number}) => {
  const [goals, setGoals] = useState({
    aj: {name: "Alex Jones", value: ""},
    ht: {name: "Hodge Twins", value: ""},
    sc: {name: "Shop Crowder", value: ""},
    ajn: {name: "Alex Jones Naturals", value: ""},
    raj: {name: "Real Alex Jones", value: ""},
    oh: {name: "Optimal Human", value: ""},
    dmo: {name: "DMO", value: ""},
    htl: {name: "Hold The Line", value: ""},
    pod: {name: "Bigly POD", value: ""},
  });
  return (
    <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
      <header>
        <h5>Add Monthly Goal</h5>
        <h2>Current Month {constGetCurrentMonth()}</h2>
      </header>
      <section className={styles.goalsContainer}>
        <div>
          {Object.entries(goals).map(([k, v], i) => {
            return (
              <div className={styles.inputWrapper}>
                <label htmlFor="name">{v.name}</label>
                <input
                  type="text"
                  name={v.name}
                  placeholder="$1,234,567.90"
                  value={goals[k as "aj"].value}
                  onChange={(e) =>
                    setGoals(
                      (prev) =>
                        prev && {
                          ...prev,
                          [k]: {...prev[k as "aj"], value: e.target.value},
                        },
                    )
                  }
                />
                <span>${formatNumber(Number(goals[k as "aj"].value))}</span>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            text={"Save"}
            thin={true}
            tone={"success"}
            icon="floppy"
            align={"center"}
          />
        </div>
      </section>
    </div>
  );
};
