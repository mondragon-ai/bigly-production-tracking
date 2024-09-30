import Image from "next/image";
import styles from "../../app/(pages)/page.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.impowered.ai/guides/pod/product"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Learn
      </a>
      <a href="https://gobigly.com/" target="_blank" rel="noopener noreferrer">
        <Image
          aria-hidden
          src="https://nextjs.org/icons/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Bigly
      </a>
      <a
        href="https://www.impowered.ai/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        imPowered
      </a>
    </footer>
  );
};
