"use client";
import {Staff} from "@/lib/types/shared";
import styles from "./Shared.module.css";
import {Dispatch, SetStateAction, useState} from "react";

const headers = ["Name", "Email", "Position", "Role"];

export const AddStaff = ({
  staff,
  setSelectedIds,
  selectedIds,
  can_select,
}: {
  staff: Staff[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  selectedIds: string[];
  can_select: boolean;
}) => {
  const toggleSelection = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id],
    );
  };

  return (
    <div className={styles.storeModal}>
      <table>
        <thead>
          <tr>
            {can_select ? (
              <th
                style={{
                  textAlign: "center",
                  padding: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                {`${selectedIds.length == 0 ? 0 : selectedIds.length}`}
              </th>
            ) : (
              <th
                style={{
                  textAlign: "center",
                  padding: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                {`${staff.length == 0 ? 0 : staff.length}`}
              </th>
            )}
            {headers &&
              headers.map((title, index) => {
                return <th key={index}>{title}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {staff.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => {
                console.log();
              }}
            >
              <td
                style={{
                  textAlign: "center",
                  padding: "0 10px",
                  verticalAlign: "middle",
                }}
              >
                {can_select && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelection(item.id)}
                  />
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.position}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
