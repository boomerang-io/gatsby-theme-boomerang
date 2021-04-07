import React from "react";
import { Email16, LogoLinkedin16, LogoTwitter16, Wikis16 } from "@carbon/icons-react";
import * as styles from "./Footer.module.scss";

const LinkType = {
  Twitter: "twitter",
  Website: "website",
  Linkedin: "linkedin",
  Email: "email",
};

const DefaultLinks = [
  {
    link: "https://ibm.com/",
    title: "IBM.com",
    type: LinkType.Website,
  },
  {
    link: "https://twitter.com/IBM/",
    title: "Follow IBM on Twitter",
    type: LinkType.Twitter,
  },
  {
    link: "https://www.linkedin.com/company/ibm",
    title: "Connect with IBM on LinkedIn",
    type: LinkType.Linkedin,
  },
  {
    link: "mailto:isesupp@us.ibm.com?subject=IBM Services Essentials",
    title: "isesupp@us.ibm.com",
    type: LinkType.Email,
  },
];

const TypeToIcon = {
  [LinkType.Twitter]: LogoTwitter16,
  [LinkType.Website]: Wikis16,
  [LinkType.Linkedin]: LogoLinkedin16,
  [LinkType.Email]: Email16,
};

function Footer({ footerLinksConfig }) {
  const socialLinks = [];
  const emailLinks = [];
  const footerLinks = footerLinksConfig.length ? footerLinksConfig : DefaultLinks;
  footerLinks.forEach((link) => (link.type === LinkType.Email ? emailLinks.push(link) : socialLinks.push(link)));

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          {socialLinks.map((link) => {
            const Icon = TypeToIcon[link.type];
            return (
              <p className={styles.footerLink}>
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
                const Icon = TypeToIcon[link.type];
                return (
                  <p className={styles.footerLink}>
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
