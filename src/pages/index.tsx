import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

import { useColorMode } from '@docusaurus/theme-common';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground}>
        <div className={styles.gridOverlay}></div>
      </div>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Targeted Surveys with PostHog
          </Heading>
          <p className={styles.heroSubtitle}>
            Learn to trigger surveys based on key user product flows
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro">
              Get Started
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="img/posthog-logo.svg"
            alt="PostHog Logo"
            className={clsx(styles.floatingLogo, colorMode === 'dark' && styles.nightLight)}
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  useEffect(() => {
    // Add class to body to hide footer on homepage
    document.body.classList.add('homepage');
    return () => {
      document.body.classList.remove('homepage');
    };
  }, []);

  return (
    <Layout
      title="Targeted Surveys Tutorial"
      description="Learn how to trigger surveys that target users based on key product flows using PostHog">
      <HomepageHeader />
    </Layout>
  );
}
