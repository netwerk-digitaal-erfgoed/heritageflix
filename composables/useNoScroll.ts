export const useNoScroll = () => {
  const htmlElement = document.querySelector('html');
  if (!htmlElement.classList.contains('no-scroll')) {
    htmlElement.classList.add('no-scroll');
  }
}
