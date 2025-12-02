import React from 'react';
import styles from './styles.module.css';

type DocBannerProps = {
  eta?: string;
  overview?: string;
  techStack?: string[];
  prerequisites?: {
    text: string;
    link?: string;
  }[];
};

const Icons = {
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Clipboard: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Tools: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.30003L20 11.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.0001 5.30003C20.657 6.95688 20.657 9.64318 19.0001 11.3L16.3 14L10.7 8.40003L13.4 5.70003C15.0569 4.04318 17.7432 4.04318 19.4001 5.70003H19.0001V5.30003Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.1 11.3L8.10005 15.3C7.20005 16.2 7.20005 17.6 8.10005 18.5C9.00005 19.4 10.4 19.4 11.3 18.5L15.3 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 22L6.6 17.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '14px' }}>
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export default function DocBanner({
  eta,
  overview,
  techStack,
  prerequisites,
}: DocBannerProps): React.ReactNode {
  const showMainBanner = eta || overview || (techStack && techStack.length > 0);
  const showPrereqs = prerequisites && prerequisites.length > 0;

  if (!showMainBanner && !showPrereqs) {
    return null;
  }

  return (
    <>
      {showMainBanner && (
        <div className={styles.banner}>
          <div className={styles.bannerGrid}>
            {eta && (
              <div className={styles.bannerItem}>
                <div className={styles.bannerIcon}>
                  <Icons.Clock />
                </div>
                <div className={styles.bannerContent}>
                  <span className={styles.bannerLabel}>Estimated Time</span>
                  <span className={styles.bannerValue}>{eta}</span>
                </div>
              </div>
            )}

            {overview && (
              <div className={styles.bannerItem}>
                <div className={styles.bannerIcon}>
                  <Icons.Clipboard />
                </div>
                <div className={styles.bannerContent}>
                  <span className={styles.bannerLabel}>Overview</span>
                  <span className={styles.bannerValue}>{overview}</span>
                </div>
              </div>
            )}

            {techStack && techStack.length > 0 && (
              <div className={styles.bannerItem}>
                <div className={styles.bannerIcon}>
                  <Icons.Tools />
                </div>
                <div className={styles.bannerContent}>
                  <span className={styles.bannerLabel}>Tech Stack</span>
                  <div className={styles.techStackList}>
                    {techStack.map((tech, index) => (
                      <span key={index} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showPrereqs && (
        <div className={`${styles.banner} ${styles.prereqBanner}`}>
          <div className={styles.bannerItem}>
            <div className={styles.bannerIcon}>
              <Icons.Check />
            </div>
            <div className={styles.bannerContent} style={{ flex: 1 }}>
              <span className={styles.bannerLabel}>Prerequisites</span>
              <ul className={styles.prereqList}>
                {prerequisites.map((prereq, index) => (
                  <li key={index}>
                    {prereq.link ? (
                      <a href={prereq.link} target="_blank" rel="noopener noreferrer">
                        {prereq.text} <Icons.ArrowRight />
                      </a>
                    ) : (
                      prereq.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}