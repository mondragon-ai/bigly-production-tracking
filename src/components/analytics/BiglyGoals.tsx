"use client";
import {constGetCurrentMonth} from "@/lib/utils/converter.tsx/time";
import styles from "../Shared.module.css";
import {Button} from "../shared/Button";
import {useState} from "react";
import {formatNumber} from "@/lib/utils/converter.tsx/numbers";
import {BiglySalesGoals} from "@/lib/types/reports";

export const BiglyGoalsCard = ({
  width,
  goals,
  saveGoals,
}: {
  width: number;
  goals: BiglySalesGoals;
  saveGoals: (goals: BiglySalesGoals) => Promise<void>;
}) => {
  if (!goals) return;

  const [goal, setGoals] = useState({
    aj: {name: "Alex Jones", value: `${goals?.aj || ""}`},
    ht: {name: "Hodge Twins", value: `${goals?.ht || ""}`},
    sc: {name: "Shop Crowder", value: `${goals?.sc || ""}`},
    ajn: {name: "Alex Jones Naturals", value: `${goals?.ajn || ""}`},
    raj: {name: "Real Alex Jones", value: `${goals?.raj || ""}`},
    oh: {name: "Optimal Human", value: `${goals?.oh || ""}`},
    dmo: {name: "DMO", value: `${goals?.dmo || ""}`},
    htl: {name: "Hold The Line", value: `${goals?.htl || ""}`},
    pod: {name: "Bigly POD", value: `${goals?.pod || ""}`},
    annual: {name: "Annual", value: `${goals?.annual || ""}`},
  });

  const handleSaveGoals = async () => {
    const payload = {
      ht: Number(goal.ht.value),
      sc: Number(goal.sc.value),
      aj: Number(goal.aj.value),
      ajn: Number(goal.ajn.value),
      raj: Number(goal.raj.value),
      oh: Number(goal.oh.value),
      dmo: Number(goal.dmo.value),
      htl: Number(goal.htl.value),
      pod: Number(goal.pod.value),
      annual: Number(goal.annual.value),
      sum: {n: {total: 0, sales: {}}},
      ytd: 0,
    };
    await saveGoals(payload);
  };
  return (
    <div className={styles.chartWrapperBox} style={{width: `${width}%`}}>
      <header>
        <h5>Add Monthly Goal</h5>
        <h2>Current Month {constGetCurrentMonth()}</h2>
      </header>
      <section className={styles.goalsContainer}>
        <div>
          {Object.entries(goal).map(([k, v], i) => {
            if (k == "annual") return;
            else {
              return (
                <div className={styles.inputWrapper}>
                  <label htmlFor="name">{v.name}</label>
                  <input
                    type="text"
                    name={v.name}
                    placeholder="$0.0"
                    value={goal[k as "aj"].value}
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
                  <span>${formatNumber(Number(goal[k as "aj"].value))}</span>
                </div>
              );
            }
          })}
        </div>
        <div>
          <div className={styles.inputWrapper}>
            <label htmlFor="name">Annual Goals</label>
            <input
              type="text"
              name={"annual"}
              placeholder="$0.0"
              value={goal.annual.value}
              onChange={(e) =>
                setGoals(
                  (prev) =>
                    prev && {
                      ...prev,
                      annual: {...prev.annual, value: e.target.value},
                    },
                )
              }
            />
            <span>${formatNumber(Number(goal.annual.value))}</span>
          </div>
        </div>
        <div>
          <Button
            text={"Save"}
            thin={true}
            tone={"success"}
            icon="floppy"
            align={"center"}
            onClick={() => handleSaveGoals()}
          />
        </div>
      </section>
    </div>
  );
};
