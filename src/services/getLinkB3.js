require('dotenv/config');
const puppeteer = require('puppeteer');

const main = async (url) => {
  const strInteresse = process.env.STR_INTERESSE;

  console.log('Abrindo o launcher');
  const browser = await puppeteer.launch({
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--single-process',
      '--no-zygote',
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  console.log('Procurando o link');
  await page.goto(url);
  console.log('Abriu a pagina');
  const link = await page.evaluate(() => {
    const arr = Array.from(document.querySelectorAll('a'), (el) => ({
      text: el.innerText,
      src: el.href,
    }));

    return arr;
  });
  console.log('Fechando o browser');
  await browser.close();

  const objInteresse = link.find((el) => el.text.includes(strInteresse));
  objInteresse
    ? console.log('Fonte primária encontrada.')
    : console.log('Link NAO encontrado!!!');
  return objInteresse;
};

module.exports = main;
