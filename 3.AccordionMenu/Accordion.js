const menuList = [
  {
    title: 'HTML',
    subMenu: [
      { title: 'Semantic Web', path: '#' },
      { title: 'Hyperlink', path: '#' },
      { title: 'Form', path: '#' },
    ],
  },
  {
    title: 'CSS',
    subMenu: [
      { title: 'Selector', path: '#' },
      { title: 'Box model', path: '#' },
      { title: 'Layout', path: '#' },
    ],
  },
  {
    title: 'JavaScript',
    subMenu: [
      { title: 'Variable', path: '#' },
      { title: 'Function', path: '#' },
      { title: 'Object', path: '#' },
    ],
  },
];

/**
 * @type ($container: HTMLElement, option?: {showMultiple: boolean}) => void
 * showMultiple: 여러 메뉴를 동시에 오픈할지 여부(default: false)
 *
 * @example
 * Accordion(document.getElementById('accordion1'));
 * Accordion(document.getElementById('accordion2'), { showMultiple: true });
 */
const Accordion = ($container, option = { showMultiple: false }) => {
  // do something!
};

export default Accordion;
