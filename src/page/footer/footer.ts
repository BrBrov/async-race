import './footer.scss';
import '../../assets/svg/git.svg';
import '../../assets/png/rss.png';

export default class Footer {
  public readonly footer: HTMLElement;

  constructor() {
    this.footer = this.createFooter();
  }

  private createFooter(): HTMLElement {
    enum Links {
      git = 'https://github.com/rolling-scopes-school/brbrov-JSFE2022Q3.git',
      rss = 'https://rs.school/',
    }
    const footer: HTMLElement = document.createElement('footer');
    footer.className = 'footer';

    let elem: HTMLElement = this.createLink(Links.git, 'git', './assets/svg/git.svg');

    footer.append(elem);

    elem = document.createElement('span');
    elem.className = 'footer__text';
    elem.textContent = 'Async Race, 2023';

    footer.append(elem);

    elem = this.createLink(Links.rss, 'rss', './assets/img/rss.png');

    footer.append(elem);

    return footer;
  }

  private createLink(link: string, name: string, imgPath: string): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = `footer__${name}-wrapper`;

    const linkElem: HTMLAnchorElement = document.createElement('a');
    linkElem.className = `footer__${name}-link`;
    linkElem.href = link;

    const img: HTMLImageElement = document.createElement('img');
    img.className = `footer__${name}-img`;
    img.alt = name;
    img.src = imgPath;

    linkElem.append(img);
    wrapper.append(linkElem);

    return wrapper;
  }
}
