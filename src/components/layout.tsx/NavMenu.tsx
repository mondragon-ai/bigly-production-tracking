"use client";
import Link from "next/link";
import {LOGO} from "@/lib/constants";
import {Avatar} from "../shared/Avatar";
import styles from "./Layout.module.css";
import {useEffect, useState} from "react";
import {Divider} from "../shared/Divider";
import {usePathname} from "next/navigation";
import {useGlobalContext} from "@/lib/store/context";
import {initialUser} from "@/lib/data/store";
import {useRouter} from "next/navigation";

export const NavMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {globalState, setGlobalState} = useGlobalContext();
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const slug = pathname.split("/")[1];
    setSlug(slug);
  }, [pathname]);

  const handleLogout = () => {
    router.push("/");
    setGlobalState("user", initialUser);
  };

  return (
    <header className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={LOGO} alt="logo" />
      </div>
      <Divider width={90} />
      <nav>
        <div className={styles.topNav}>
          <span>MENU</span>
          <ul>
            <li>
              <Link
                href={"/analytics"}
                style={{
                  backgroundColor:
                    slug === "analytics"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                    />
                  </svg>
                  <h5
                    style={{
                      fontWeight: slug === "analytics" ? 550 : 100,
                      color:
                        slug === "analytics"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Analytics
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/jobs"}
                style={{
                  backgroundColor:
                    slug === "jobs" || slug === "job" || slug === "new"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                    />
                  </svg>
                  <h5
                    style={{
                      fontWeight:
                        slug === "jobs" || slug === "job" || slug === "new"
                          ? 450
                          : 100,
                      color:
                        slug === "jobs"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Jobs
                  </h5>
                </div>
                <h5
                  className={styles.numbers}
                  style={{
                    backgroundColor:
                      slug === "jobs" || slug === "job" || slug === "new"
                        ? "var(--tertary-background)"
                        : "transparent",
                  }}
                >
                  2,500
                </h5>
              </Link>
            </li>
            <li>
              <Link
                href={"/create"}
                style={{
                  backgroundColor:
                    slug === "create"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                    />
                  </svg>
                  <h5
                    style={{
                      fontWeight: slug === "create" ? 450 : 100,
                      color:
                        slug === "create"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Create Jobs
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/files"}
                style={{
                  backgroundColor:
                    slug === "files"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m2.665 9H6.647A1.647 1.647 0 0 1 5 15.353v-1.706A1.647 1.647 0 0 1 6.647 12h1.018M16 12l1.443 4.773L19 12m-6.057-.152-.943-.02a1.34 1.34 0 0 0-1.359 1.22 1.32 1.32 0 0 0 1.172 1.421l.536.059a1.273 1.273 0 0 1 1.226 1.718c-.2.571-.636.754-1.337.754h-1.13"
                    />
                  </svg>
                  <h5
                    style={{
                      fontWeight: slug === "files" ? 450 : 100,
                      color:
                        slug === "files"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Files
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/images"}
                style={{
                  backgroundColor:
                    slug === "images"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                  </svg>
                  <h5
                    style={{
                      fontWeight: slug === "images" ? 450 : 100,
                      color:
                        slug === "images"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Images
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/items"}
                style={{
                  backgroundColor:
                    slug === "items"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                    />
                  </svg>

                  <h5
                    style={{
                      fontWeight: slug === "items" ? 450 : 100,
                      color:
                        slug === "items"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Items
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/inventory"}
                style={{
                  backgroundColor:
                    slug === "inventory"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                    />
                  </svg>

                  <h5
                    style={{
                      fontWeight: slug === "inventory" ? 450 : 100,
                      color:
                        slug === "inventory"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Inventory
                  </h5>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.bottomNav}>
          <span>GENERAL</span>
          <ul>
            <li>
              <Link
                href={"/settings"}
                style={{
                  backgroundColor:
                    slug === "settings"
                      ? "var(--tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="0.6"
                      d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                    />
                  </svg>

                  <h5
                    style={{
                      fontWeight: slug === "analytics" ? 450 : 100,
                      color:
                        slug === "analytics"
                          ? "var(--primary-text)"
                          : "var(--secondary-text)",
                    }}
                  >
                    Settings
                  </h5>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                onClick={handleLogout}
                style={{
                  backgroundColor:
                    slug === "settings"
                      ? "var(----tertary-background)"
                      : "transparent",
                }}
              >
                <div className={styles.left}>
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.6"
                      d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                    />
                  </svg>

                  <h5>Sign Out</h5>
                </div>
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <div className={styles.avatarWrapper}>
                  <Avatar staff={null} />
                  <div className={styles.text}>
                    <h6>{globalState.user.role}</h6>
                    <h5>{globalState.user.email}</h5>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
