import openModal from './openModal';

export default document
  .querySelector('.gallery')
  .addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  if (e.target.nodeName.toLowerCase() !== 'img') {
    return;
  }
  const bigImg = e.target.dataset.bigImg;
  openModal(bigImg);
}
