function loadAndClassifyProducts() {
  fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTDf3ZQ3HRTX6htieuOFkozQQsryThbFtLSB8R6lrXg48HJa8Ad1EICE4wKo4FhhaiM0dGrNe7Now9o/pub?gid=1640858237&single=true&output=csv')
    .then(response => response.text())
    .then(csv => {
      const data = csvToJson(csv);
      data.forEach(product => {
        if (product.Category.toUpperCase() == "JUICE") {
          addProductToContainer(product, "Juice__sectionItems");
        }
        else if (product.Category.toUpperCase() == "COCKTAIL") {
          addProductToContainer(product, "Cocktail__sectionItems");
        }
      });
    })
    .catch(error => console.error('Error:', error));
}

function csvToJson(csv) {
  const lines = csv.split(/\r?\n/);
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
function addProductToContainer(product, category) {
  const templateContainer = document.querySelector('.item').cloneNode(true);
  templateContainer.style.display = '';
  const productNameElement = templateContainer.querySelector('.productName');
  productNameElement.textContent = product['Product Name'];
  const productPriceTag = templateContainer.querySelector('.priceTag');
  productPriceTag.textContent = product["Price"];
  const productDesc = templateContainer.querySelector('.productDesc')
  productDesc.textContent = product["Desc"]
  const imgElement = templateContainer.querySelector('.item__image');
  if (imgElement && product['Image Link']) {
    imgElement.setAttribute('src', product['Image Link']);
  }
  const parentContainer = document.querySelector(`.${category}`);
  parentContainer.appendChild(templateContainer);
}
loadAndClassifyProducts();

const sectionArrowsContainer = document.querySelectorAll('.sectionArrowContainer');


sectionArrowsContainer.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    const itemsSection = arrow.parentElement.parentElement;
    const itemsContainer = itemsSection.querySelector('.sectionItems');
    const sectionArrow = itemsSection.querySelector('.sectionArrow');
    itemsContainer.classList.toggle('hidden');
    itemsSection.classList.toggle('collapse');
    sectionArrow.classList.toggle('rotateArrow');
    console.log(arrow)
  })
})






