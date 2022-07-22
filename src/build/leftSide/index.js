import { useLinksOptions } from '@acnb/options'
import { isOwner } from '../../utils/cnblog'
import {
  admin,
  cnblogHome,
  draftBox,
  index,
  newPost,
  send,
} from '../../constants/links'
import './index.scss'

const buildLeftSidebarContainer = () => {
  const el = $('<div id=\'left-side\'></div>')
  $('#home').append(el)
}

const buildLogo = () => {
  const el = $(`<div class='logo'>
                    <a href="https://www.cnblogs.com/">CNBLOG</a>
                </div>`)
  $('#left-side').append(el)
}

const buildCustomLinks = () => {
  /**
   * 兼容旧的配置 Array<Link>
   * 当前推荐的配置类型为
   *    {
   *      enable: boolean;
   *      value: Array<Link>;
   *    }
   */
  function isOldConfig(userConfig) {
    for (const [key] of Object.entries(userConfig)) {
      if (!Number.isNaN(parseInt(key))) {
        return true
      }
    }
    return false
  }

  let links
  const userConfig = useLinksOptions()
  if (isOldConfig(userConfig)) {
    links = []
    for (const [key, value] of Object.entries(userConfig)) {
      if (!Number.isNaN(parseInt(key))) {
        links.push(value)
      }
    }
  } else {
    const { enable, value } = userConfig
    links = value
    if (!enable)
    { return }
  }
  const el = $(`<div class="links side-wrapper">
                      <h3>LINKS</h3>
                      <ul></ul>
                  </div>`)
  for (const { name, link } of links) {
    el.find('ul').append(
      `<li><a href="${link}" target="_blank">${name}</a></li>`,
    )
  }
  $('#left-side').append(el)
}

const removeHeaderToLeftSidebar = () => {
  const navList = [
    {
      icon: 'fa-blog',
      title: '博客园',
      url: cnblogHome,
      allowVisit: true,
    },
    {
      icon: 'fa-home',
      title: '首页',
      url: index,
      allowVisit: true,
    },
    {
      icon: 'fa-pen-square',
      title: '新随笔',
      url: newPost,
      allowVisit: true,
    },
    {
      icon: 'fa-paper-plane',
      title: '草稿箱',
      url: draftBox,
      allowVisit: true,
    },
    {
      icon: 'fa-envelope',
      title: '联系',
      url: send,
      allowVisit: true,
    },
    {
      icon: 'fa-cog',
      title: '管理',
      url: admin,
      allowVisit: false,
    },
  ]

  const el = $(`
    <div id="cnblog-nav" class="side-wrapper">
        <h3>MENU</h3>
        <ul></ul>
    </div>
    `)

  for (const { icon, title, url, allowVisit } of navList) {
    const target = title === '首页' ? '_self' : '_blank'
    const item = $(`<a href="${url}" target="${target}">
            <li>
                <span class="fas fa-fw ${icon}"></span>
                <span class="nav-item-text">${title}</span>
            </li>
        </a>`)

    if (!isOwner && !allowVisit) {
      continue
    }

    el.find('ul').append(item)
  }

  $('#left-side .logo').after(el)
}

export default () => {
  buildLeftSidebarContainer()
  buildLogo()
  buildCustomLinks()
  removeHeaderToLeftSidebar()
}
