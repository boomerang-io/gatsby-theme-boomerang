import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Card.module.scss";

const Card = ({ cardClass, title, text }) => (
  <div className={cx(styles.container, { [cardClass]: cardClass })}>
    <div className={styles.image} />
    <div className={styles.info}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{text}</p>
    </div>
  </div>
);

Card.propTypes = {
  cardClass: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Card;
