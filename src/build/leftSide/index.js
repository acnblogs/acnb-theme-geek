import { useLinksOptions, useGithubOptions } from "@acnb/options";
import { getBlogName } from "../../utils/cnblog";
import { isOwner } from "../../utils/cnblog";
import { avatar } from "../../constants/cnblog";
import {
  cnblogHome,
  index,
  newPost,
  send,
  rss,
  admin,
} from "../../constants/links";
import "./index.scss";

const buildLeftSidebar = () => {
  const { enable } = useLinksOptions();
  const el = $(`
    <div id='left-side'>
        <div class='logo'>
            <a href="https://www.cnblogs.com/">CNBLOG</a>
        </div>
    </div>`);
  if (enable) {
    const el = `
        <div class="links side-wrapper">
            <h3>Links</h3>
            <ul></ul>
        </div>
        `;
    el.append(el);
  }
  $("#home").append(el);
};

const buildCustomLinks = () => {
  const { enable, value } = useLinksOptions();
  if (!enable) return;
  for (const { name, link } of value) {
    $("#left-side")
      .find("ul")
      .append(`<li><a href="${link}" target="_blank">${name}</a></li>`);
  }
};

const removeHeaderToLeftSidebar = () => {
  const navList = [
    {
      icon: "fa-blog",
      title: "博客园",
      url: cnblogHome,
      allowVisit: true,
    },
    {
      icon: "fa-home",
      title: "首页",
      url: index,
      allowVisit: true,
    },
    {
      icon: "fa-pen-square",
      title: "新随笔",
      url: newPost,
      allowVisit: true,
    },
    {
      icon: "fa-envelope",
      title: "联系",
      url: send,
      allowVisit: true,
    },
    {
      icon: "fa-rss-square",
      title: "订阅",
      url: rss,
      allowVisit: true,
    },
    {
      icon: "fa-cog",
      title: "管理",
      url: admin,
      allowVisit: false,
    },
  ];

  const el = $(`
    <div id="cnblog-nav" class="side-wrapper">
        <h3>MENU</h3>
        <ul></ul>
    </div>
    `);

  for (const { icon, title, url, allowVisit } of navList) {
    const target = title === "首页" ? "_self" : "_blank";
    const item = $(`<a href="${url}" target="${target}">
            <li>
                <span class="fas ${icon}"></span>
                <span class="nav-item-text">${title}</span>
            </li>
        </a>`);

    if (!isOwner && !allowVisit) continue;
    if (title === "订阅") {
      item.removeAttr("target").attr({
        "data-rss": url,
        href: "javascript:void(0)",
        onclick: '$("#blog_nav_rss").trigger("click");',
      });
    }

    el.find("ul").append(item);
  }

  $("#left-side .logo").after(el);
};

const buildBottomBtns = () => {
  const { enable, url } = useGithubOptions();
  if (!enable) return;
  const userName = getBlogName();
  const el = `
    <div class="left-sidebar_bottom">
    <a href="${url}" class="follow-me" target="_blank">
        <span class="follow-text"><i class="fas fa-github"></i><span>Fork me on GitHub</span></span>
        <span class="developer">
            <img src="${avatar}">
            <span>${userName}</span>
        </span>
    </a>
    </div>`;
  $("#left-side").append(el);
};

export default () => {
  buildLeftSidebar();
  buildCustomLinks();
  removeHeaderToLeftSidebar();
  buildBottomBtns();
};
