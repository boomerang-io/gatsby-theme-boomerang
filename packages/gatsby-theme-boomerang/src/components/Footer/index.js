import React from "react";
import { Email16, LogoLinkedin16, LogoTwitter16, Wikis16 } from "@carbon/icons-react";
import * as styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <p className={styles.footerLink}>
            <a href="https://ibm.com/">
              <Wikis16 className={styles.footerIcon} /> IBM.com
            </a>
          </p>
          <p className={styles.footerLink}>
            <a href="https://twitter.com/IBM/">
              <LogoTwitter16 className={styles.footerIcon} /> Follow IBM on Twitter
            </a>
          </p>
          <p className={styles.footerLink}>
            <a href="https://www.linkedin.com/company/ibm">
              <LogoLinkedin16 className={styles.footerIcon} /> Connect with IBM on LinkedIn
            </a>
          </p>
        </div>
        <div className={styles.footerContact}>
          <p className={styles.footerText}>Questions? Send us an email!</p>
          <p className={styles.footerLink}>
            <a href="mailto:isesupp@us.ibm.com?subject=IBM Services Essentials">
              <Email16 className={styles.footerIcon} /> isesupp@us.ibm.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
