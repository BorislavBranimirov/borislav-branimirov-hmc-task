/**
 * Boilerplate file for getting and processing a product feed.
 *
 * Desired product structure:
 * {
 *  "id": number,
 *  "name": string,
 *  "description": string,
 *  "price": string or a number - up to you,
 *  "link": string,
 *  "tags": string[]
 * }
 */

const storeDomain = 'https://earos.com';
const productsEndpoint = '/products.json';

const formatProducts = (products) => {
  // Logic for formatting our products here.
  return products.map((product) => {
    // Sanitised product description
    const productDescription = product.body_html.replace(/<[^>]*>/g, '');

    // Link for the product page
    // Non-standard URL characters are escaped in case the handle contains them
    const productLink = encodeURI(`${storeDomain}/products/${product.handle}`);

    const formattedProduct = {
      id: product.id,
      name: product.title,
      description: productDescription,
      price: product.variants[0].price,
      link: productLink,
      tags: product.tags,
    };

    return formattedProduct;
  });
};

const getProducts = async () => {
  // Logic for getting the products here.

  // In a real-life scenario, we would get the url from a
  // config file or pass it as an argument to getProducts()
  const url = `${storeDomain}${productsEndpoint}`;
  const res = await (await fetch(url)).json();

  const products = formatProducts(res.products);
  return products;
};

// Invoke your logic here.
const printProducts = async () => {
  const products = await getProducts();
  console.log(products);
};

printProducts();
