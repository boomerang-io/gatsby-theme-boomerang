import React, { useState } from "react";
import PropTypes from "prop-types";
import SideNav from "Components/SideNav";
import RightSideNav from "Components/RightSideNav";
import ToggleNavButton from "Components/ToggleNavButton";
import cx from "classnames";
import styles from "./Layout.module.scss";

export default function Layout({ children, docNodes, location, pageContext, solutionTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={styles.container}>
      <ToggleNavButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Open" : "Collapse"}
      </ToggleNavButton>
      <div
        className={cx(styles.sideNavContainer, {
          [styles.sideNavIsOpen]: isOpen,
        })}
      >
        <SideNav docNodes={docNodes} location={location} pageContext={pageContext} solutionTitle={solutionTitle} />
      </div>
      <div id="content" className={styles.docContainer}>
        {children}
      </div>
      <div className={styles.rightNavContainer}>
        <RightSideNav docNodes={docNodes} location={location} />
      </div>
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  docNodes: PropTypes.array,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  solutionTitle: PropTypes.string,
};
