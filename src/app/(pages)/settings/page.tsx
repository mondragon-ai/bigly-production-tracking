"use client";
import {CreateStore, StoreCard} from "@/components/settings/CreateStore";
import {CreateUser, UserCard} from "@/components/settings/CreateUser";
import {StartingState} from "@/components/images/StartingState";
import styles from "../../../components/Shared.module.css";
import {StoreList} from "@/components/settings/StoreList";
import PageHeader from "@/components/shared/PageHeader";
import {UserList} from "@/components/settings/UserList";
import {useSettings} from "@/lib/hooks/useSettings";
import {initialStaff} from "@/lib/payloads/staff";
import {initialStore} from "@/lib/payloads/store";
import {useState} from "react";

export default function Settings() {
  const [create, setCreate] = useState<{staff: boolean; store: boolean}>({
    staff: false,
    store: false,
  });
  const {data, staff, store, selectItem, setStaff, setStore} = useSettings();

  const handleSelect = (id: string, type: "store" | "staff") => {
    console.log({id, type});
    selectItem(id, type);
  };

  const addItem = (type: "store" | "staff") => {
    console.log(type);
    if (type == "staff") {
      setStaff(initialStaff);
      setCreate((prev) => ({...prev, staff: true}));
    }
    if (type == "store") {
      setStore(initialStore);
      setCreate((prev) => ({...prev, store: true}));
    }
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settings"
        buttons={[
          {
            text: "ADD ACCOUNT",
            tone: "success",
            onClick: () => addItem("staff"),
            icon: "add-user",
          },
          {
            text: "ADD STORE",
            tone: "success",
            onClick: () => addItem("store"),
            icon: "store",
          },
        ]}
        date={""}
        badges={[]}
        staff={[]}
      />
      <div>
        <div className={styles.rowSection} style={{width: "100%"}}>
          <section style={{width: "55%", paddingRight: "10px"}}>
            <UserList
              headers={users_headers}
              items={data.staff}
              selectItem={handleSelect}
            />
          </section>
          <section style={{width: "45%", paddingLeft: "10px"}}>
            {create.staff ? (
              <CreateUser staff={staff} />
            ) : staff ? (
              <UserCard staff={staff} />
            ) : (
              <StartingState type={"user"} />
            )}
          </section>
        </div>
        <div className={styles.rowSection} style={{width: "100%"}}>
          <section style={{width: "55%", paddingRight: "10px"}}>
            <StoreList
              headers={store_header}
              items={data.store}
              selectItem={handleSelect}
            />
          </section>
          <section style={{width: "45%", paddingLeft: "10px"}}>
            {create.store ? (
              <CreateStore store={store} />
            ) : store ? (
              <StoreCard store={store} />
            ) : (
              <StartingState type={"store"} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

const users_headers = ["Name", "Email", "Role", "Added"];
const store_header = ["Name", "API Key", "Added"];
