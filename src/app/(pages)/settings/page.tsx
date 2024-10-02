"use client";
import PageHeader from "@/components/shared/PageHeader";
import {UserList} from "@/components/settings/UserList";
import {StoreList} from "@/components/settings/StoreList";
import styles from "../../../components/Shared.module.css";
import {CreateUser} from "@/components/settings/CreateUser";
import {CreateStore} from "@/components/settings/CreateStore";
import {useSettings} from "@/lib/hooks/useSettings";

export default function Settings() {
  const {data, staff, store, selectItem} = useSettings();

  const handleSelect = (id: string, type: "store" | "staff") => {
    console.log({id, type});
    selectItem(id, type);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Settings"
        buttons={[
          {
            text: "ADD ACCOUNT",
            tone: "success",
            onClick: undefined,
            icon: "link",
          },
          {
            text: "ADD STORE",
            tone: "success",
            onClick: undefined,
            icon: "link",
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
            <CreateUser staff={staff} />
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
            <CreateStore store={store} />
          </section>
        </div>
      </div>
    </div>
  );
}

const users_headers = ["Name", "Email", "Role", "Added"];
const store_header = ["Name", "API Key", "Added"];
const users_items = [
  {
    id: "1",
    name: "Scrub",
    email: "scrub@gobigly.com",
    role: "admin",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Blake",
    email: "blake@gobigly.com",
    role: "admin",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Ben",
    email: "Ben@gobigly.com",
    role: "admin",
    added: "Jan 6 2024 4:20 PM",
  },
  {
    id: "1",
    name: "Josh",
    email: "josh@gobigly.com",
    role: "staff",
    added: "Jan 6 2024 4:20 PM",
  },
];

const store_items = [
  {
    id: "1",
    name: "Scrub",
    api_key: "shpat_12309u0299",
    added: "Jan 6 2024 4:20 PM",
  },
];

// const CustomHeader = () => {
//   return (
//     <header className={styles.pageHeaderWrapper}>
//       <div className={styles.left}>
//         <div>
//           <h1 className={geistSans.className}>Settings</h1>
//         </div>
//       </div>
//       <div className={styles.right}>
//         <Button
//           thin={true}
//           text="ADD ACCOUNT"
//           tone={"success"}
//           align={"center"}
//         />
//         <Button
//           thin={true}
//           text="ADD STORE"
//           tone={"success"}
//           align={"center"}
//         />
//       </div>
//     </header>
//   );
// };
