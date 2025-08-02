import { withSidebar } from 'vitepress-sidebar'
import { name, repository, homepage } from '../../../package.json'
import { defineConfig, UserConfig } from 'vitepress'
import { withI18n } from 'vitepress-i18n'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'
import type { VitePressI18nOptions } from 'vitepress-i18n/types'

const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)
const supportLocales = ['en', 'ko', 'zhHans']
const defaultLocale: string = supportLocales[0]

const vitePressI18nConfigs: VitePressI18nOptions = {
  locales: supportLocales,
  rootLocale: defaultLocale,
  searchProvider: 'local',
  description: {
    en: 'Vutron is a preconfigured template for developing Electron cross-platform desktop apps. It uses Vue 3 and allows you to build a fast development environment with little effort.',
    ko: 'Vutron은 Electron 크로스 플랫폼 데스크톱 앱 개발을 위해 미리 구성된 템플릿입니다. Vue 3을 사용하며 적은 노력으로 빠른 개발 환경을 구축할 수 있습니다.',
    zhHans:
      'Vutron 是用于开发 Electron 跨平台桌面应用程序的预配置模板。它使用 Vue 3，可让您轻松构建快速开发环境。'
  },
  themeConfig: {
    en: {
      nav: [
        {
          text: 'Getting Started',
          link: '/installation-and-build/getting-started'
        }
      ]
    },
    ko: {
      nav: [
        {
          text: '시작하기',
          link: '/ko/installation-and-build/getting-started'
        }
      ]
    },
    zhHans: {
      nav: [
        {
          text: '入门',
          link: '/zhHans/installation-and-build/getting-started'
        }
      ]
    }
  }
}

const vitePressSidebarConfigs: VitePressSidebarOptions = [
  ...supportLocales.map((lang) => {
    return {
      collapsed: false,
      useTitleFromFileHeading: true,
      useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
      sortMenusByFrontmatterOrder: true,
      hyphenToSpace: true,
      capitalizeEachWords: true,
      manualSortFileNameByPriority: [
        'introduction.md',
        'installation-and-build',
        'project-structures',
        'electron-how-to'
      ],
      documentRootPath: `/src/${lang}`,
      resolvePath: defaultLocale === lang ? '/' : `/${lang}/`,
      ...(defaultLocale === lang ? {} : { basePath: `/${lang}/` })
    }
  })
]

const vitePressConfigs: UserConfig = {
  title: capitalizeFirst(name),
  lastUpdated: true,
  outDir: '../dist',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],
  cleanUrls: true,
  metaChunk: true,
  rewrites: {
    'en/:rest*': ':rest*'
  },
  sitemap: {
    hostname: homepage
  },
  themeConfig: {
    logo: { src: '/icon.png', width: 24, height: 24 },
    editLink: {
      pattern: 'https://github.com/jooy2/vutron/edit/main/docs/src/:path'
    },
    socialLinks: [{ icon: 'github', link: repository.url.replace('.git', '') }]
  }
}

export default defineConfig(
  withSidebar(
    withI18n(vitePressConfigs, vitePressI18nConfigs),
    vitePressSidebarConfigs
  )
)
