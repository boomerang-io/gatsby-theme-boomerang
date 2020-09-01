import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import styles from "./ToggleNavButton.module.scss";

ToggleNavButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func
};

function ToggleNavButton({ isOpen, ...other }) {
  return (
    <button
      className={classNames(styles.button, {
        [styles.isOpen]: isOpen
      })}
      {...other}
    >
      <svg height="32" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32">
        <g>
          <rect className={styles.bar1} x="0" y="0" width="32" height="4" rx="2" />
          <rect className={styles.bar2} x="0" y="12" width="32" height="4" rx="2" />
          <rect className={styles.bar3} x="0" y="24" width="32" height="4" rx="2" />
        </g>
      </svg>
    </button>
  );
}

export default ToggleNavButton;
