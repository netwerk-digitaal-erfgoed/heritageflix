export const useScroll = () => {
  const htmlElement = document.querySelector('html');
  if (htmlElement.classList.contains('no-scroll')) {
    htmlElement.classList.remove('no-scroll');
  }
}
