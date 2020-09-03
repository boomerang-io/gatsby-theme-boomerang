import React from "react";
import PropTypes from "prop-types";
import Link from "@gatsby-theme-boomerang/components/Link";
import styles from "./NextPrevious.module.scss";

export default function NextPrevious(props) {
  const { docsContext, markdownRemark, nav } = props;
  let currentIndex;
  nav.forEach((el, index) => {
    if (el.url === docsContext + markdownRemark.fields.slug) {
      currentIndex = index;
    }
  });
  const nextInfo = {};
  const previousInfo = {};
  if (currentIndex === undefined) {
    // index
    nextInfo.url = nav[0].url;
    nextInfo.title = nav[0].title;
    previousInfo.url = null;
    previousInfo.title = null;
    currentIndex = -1;
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null;
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null;
    previousInfo.url = null;
    previousInfo.title = null;
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null;
    nextInfo.title = null;
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null;
    previousInfo.title = nav[currentIndex - 1] ? nav[currentIndex - 1].title : null;
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url;
    nextInfo.title = nav[currentIndex + 1].title;
    previousInfo.url = nav[currentIndex - 1].url;
    previousInfo.title = nav[currentIndex - 1].title;
  }
  return (
    <div className={styles.container}>
      {previousInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex - 1].url} className={styles.previousBtn}>
          <div className={styles.leftArrow}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </div>
          <div className={styles.preRightWrapper}>
            <div className={styles.smallContent}>
              <span>Previous</span>
            </div>
            <div className={styles.nextPreviousTitle}>
              <span>{nav[currentIndex - 1].title}</span>
            </div>
          </div>
        </Link>
      ) : null}
      {nextInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex + 1].url} className={styles.nextBtn}>
          <div className={styles.nextRightWrapper}>
            <div className={styles.smallContent}>
              <span>Next</span>
            </div>
            <div className={styles.nextPreviousTitle}>
              <span>{nav[currentIndex + 1] && nav[currentIndex + 1].title}</span>
            </div>
          </div>
          <div className={styles.rightArrow}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </div>
        </Link>
      ) : null}
    </div>
  );
}

NextPrevious.propTypes = {
  markdownRemark: PropTypes.object.isRequired,
  nav: PropTypes.array.isRequired,
};
