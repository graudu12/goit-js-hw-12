export const createGalleryCard = imgInfo => {
  return `<li class="gallery-item">
  <a href="${imgInfo.largeImageURL}" class="gallery-link"><img src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="360" class="gallery-img" loading="lazy"/></a>
  <ul class="gallery-info-list">
    <li>
      <h3>Likes</h3>
      <p>${imgInfo.likes}</p>
    </li>
    <li>
      <h3>Views</h3>
      <p>${imgInfo.views}</p>
    </li>
    <li>
      <h3>Comments</h3>
      <p>${imgInfo.comments}</p>
    </li>
    <li>
      <h3>Downloads</h3>
      <p>${imgInfo.downloads}</p>
    </li>
  </ul>
</li>`;
};