import * as basicLightbox from 'basiclightbox';

export default function openModal(imgBigUrl) {
  const instance = basicLightbox.create(`
    <img src="${imgBigUrl}" />
`);
  instance.show();
}
