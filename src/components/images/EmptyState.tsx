import styles from "./Images.module.css";

export const EmptyState = () => {
  return (
    <div className={styles.imageDetailWrapper} style={{border: "none"}}>
      <main className={styles.empty}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0.5"
            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
          />
        </svg>
        <div>
          <h4>Please upload a file to get started</h4>
        </div>
      </main>
    </div>
  );
};
