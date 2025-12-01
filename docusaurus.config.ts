import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Targeted Surveys with PostHog',
  tagline: 'Learn to trigger surveys based on key user product flows',
  favicon: 'img/favicon.ico',
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'posthog', // Usually your GitHub org/user name.
  projectName: 'targeted-surveys-tutorial', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add the LLM theme
  themes: ['@signalwire/docusaurus-theme-llms-txt'],

  // Add the LLM plugin
  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        // Markdown file generation options
        markdown: {
          enableFiles: true,
          relativePaths: true,
          includeBlog: false,
          includePages: false,
          includeDocs: true,
        },
        // llms.txt index file configuration
        llmsTxt: {
          enableLlmsFullTxt: false,
          includeDocs: true,
          includeBlog: false,
          includePages: false,
          siteTitle: 'Targeted Surveys with PostHog',
          siteDescription: 'Learn how to trigger surveys that target users based on key product flows',
        },
        // UI features - the copy button
        ui: {
          copyPageContent: {
            buttonLabel: 'Copy for LLM',
            display: {
              docs: true,
              excludeRoutes: [],
            },
          },
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/posthog/targeted-surveys-tutorial/tree/main/',
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Targeted Surveys',
      logo: {
        alt: 'PostHog Logo',
        src: 'img/posthog-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://posthog.com/docs/surveys',
          label: 'PostHog Docs',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Tutorial',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'PostHog Resources',
          items: [
            {
              label: 'Surveys Documentation',
              href: 'https://posthog.com/docs/surveys',
            },
            {
              label: 'Feature Flags',
              href: 'https://posthog.com/docs/feature-flags',
            },
            {
              label: 'Cohorts',
              href: 'https://posthog.com/docs/data/cohorts',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'PostHog Community',
              href: 'https://posthog.com/community',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/posthog/posthog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PostHog. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
