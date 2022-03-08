import React from "react";
import { Email16, LogoLinkedin16, LogoTwitter16, Wikis16, Bee16 } from "@carbon/icons-react";
import * as styles from "./Footer.module.scss";

const LinkType = {
  Twitter: "twitter",
  Website: "website",
  Linkedin: "linkedin",
  Email: "email",
};

const TypeToIcon = {
  [LinkType.Twitter]: LogoTwitter16,
  [LinkType.Website]: Wikis16,
  [LinkType.Linkedin]: LogoLinkedin16,
  [LinkType.Email]: Email16,
};

function Footer({ footerLinksConfig }) {
  const socialLinks = [];
  const emailLinks = [];
  footerLinksConfig.forEach((link) => (link.type === LinkType.Email ? emailLinks.push(link) : socialLinks.push(link)));

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          {socialLinks.map((link) => {
            const Icon = TypeToIcon[link.type] ?? Bee16;
            return (
              <p className={styles.footerLink} key={link.link}>
                <a href={link.link}>
                  <Icon className={styles.footerIcon} /> {link.title}
                </a>
              </p>
            );
          })}
        </div>
        <div className={styles.footerContact}>
          {emailLinks.length && (
            <>
              <p className={styles.footerText}>Questions? Send us an email!</p>
              {emailLinks.map((link) => {
                const Icon = TypeToIcon[link.type] ?? Bee16;
                return (
                  <p className={styles.footerLink} key={link.link}>
                    <a href={link.link}>
                      <Icon className={styles.footerIcon} /> {link.title}
                    </a>
                  </p>
                );
              })}
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
