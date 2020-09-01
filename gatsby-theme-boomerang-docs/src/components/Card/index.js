import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import cardIcon from "./card-icon-placeholder-1.svg";
import styles from "./Card.module.scss";

const Card = ({ cardClass, title, text, admin }) => {
  return (
    <div className={cx(styles.container, { [cardClass]: cardClass })}>
      <div className={styles.leftSection}>
        <img alt={`${title} icon`} className={styles.icon} src={cardIcon} />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{text}</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  cardClass: PropTypes.string,
  img: PropTypes.object,
  title: PropTypes.string,
  text: PropTypes.string,
  admin: PropTypes.bool,
};

export default Card;
