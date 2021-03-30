import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as styles from "./ToggleNavButton.module.scss";

function ToggleNavButton({ isOpen, ...other }) {
  return (
    <button
      className={classNames(styles.button, {
        [styles.isOpen]: isOpen,
      })}
      type="button"
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

ToggleNavButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default ToggleNavButton;
