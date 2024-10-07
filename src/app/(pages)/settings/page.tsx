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
import {SkeletonDetail, SkeletonList} from "@/components/skeleton/SkeletonList";

export default function Settings() {
  const {
    data,
    staff,
    store,
    loading,
    selectItem,
    setStaff,
    setStore,
    deleteItem,
    createStaff,
    createStore,
  } = useSettings();
  const [create, setCreate] = useState<{staff: boolean; store: boolean}>({
    staff: false,
    store: false,
  });

  const handleSelectItem = (id: string, type: "store" | "staff") => {
    console.log(type);
    if (type == "staff") {
      setStaff(initialStaff);
      setCreate((prev) => ({...prev, staff: false}));
    }
    if (type == "store") {
      setStore(initialStore);
      setCreate((prev) => ({...prev, store: false}));
    }
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

  const createItem = (type: "store" | "staff") => {
    console.log(type);
    if (type == "staff" && staff) {
      createStaff(staff);
    }
    if (type == "store" && store) {
      createStore(store);
    }
  };

  const handleDelete = async (type: "store" | "staff") => {
    if (staff && type == "staff") {
      await deleteItem(staff?.id, type);
    } else if (store && type == "store") {
      await deleteItem(store?.domain, type);
      console.log({type, create, loading});
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
            {loading == "loading" ? (
              <SkeletonList width={100} />
            ) : (
              <UserList
                headers={users_headers}
                items={data.staff || []}
                selectItem={handleSelectItem}
              />
            )}
          </section>
          <section style={{width: "45%", paddingLeft: "10px"}}>
            {create.staff && loading !== "posting" ? (
              <CreateUser
                staff={staff}
                setStaff={setStaff}
                createItem={createItem}
              />
            ) : staff && staff.id !== "" ? (
              <UserCard staff={staff} deleteItem={handleDelete} />
            ) : loading == "posting" || loading == "loading" ? (
              <SkeletonDetail width={100} />
            ) : (
              <StartingState type={"user"} />
            )}
          </section>
        </div>
        <div className={styles.rowSection} style={{width: "100%"}}>
          <section style={{width: "55%", paddingRight: "10px"}}>
            {loading == "loading" ? (
              <SkeletonList width={100} />
            ) : (
              <StoreList
                headers={store_header}
                items={data.store || []}
                selectItem={handleSelectItem}
              />
            )}
          </section>
          <section style={{width: "45%", paddingLeft: "10px"}}>
            {create.store && loading !== "posting" ? (
              <CreateStore
                store={store}
                setStore={setStore}
                createItem={createItem}
              />
            ) : store && store.id !== "" ? (
              <StoreCard store={store} deleteItem={handleDelete} />
            ) : loading == "posting" || loading == "loading" ? (
              <SkeletonDetail width={100} />
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
