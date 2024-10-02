import styles from "./Images.module.css";

export const StartingState = ({type}: {type: "image" | "file"}) => {
  return (
    <div className={styles.imageDetailWrapper}>
      <main className={styles.empty}>
        {type == "file" ? (
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
              d="M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m2.665 9H6.647A1.647 1.647 0 0 1 5 15.353v-1.706A1.647 1.647 0 0 1 6.647 12h1.018M16 12l1.443 4.773L19 12m-6.057-.152-.943-.02a1.34 1.34 0 0 0-1.359 1.22 1.32 1.32 0 0 0 1.172 1.421l.536.059a1.273 1.273 0 0 1 1.226 1.718c-.2.571-.636.754-1.337.754h-1.13"
            />
          </svg>
        ) : (
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
              strokeLinejoin="round"
              strokeWidth="0.5"
              d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
            />
            <path
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="0.5"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
        <div>
          <h4>{`Either click or upload ${
            type == "file" ? "a file" : "an image"
          } to view details`}</h4>
        </div>
      </main>
    </div>
  );
};
