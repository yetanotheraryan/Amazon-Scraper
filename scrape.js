// axios gets us the data
const axios = require('axios')
//stores the things we need and select the things we need
const cheerio = require('cheerio');
require('dotenv').config();


const url = 'https://www.amazon.com/Apple-iPhone-13-Pro-Max/dp/B09LPDM924'

let product = {name: '', price: '', link: ''}

async function scrape(){
    // fetch the data
    const {data} = await axios.get(url);
    // console.log(data);

    // load up the HTML in cheerio
    const $ = cheerio.load(data);
    let item = $('div#dp-container');
    //ectract the data that we need
    product.name = $(item).find('h1 span#productTitle').text();
    product.link = url;
    const price = $(item)
    .find('span .a-price-whole')
    .first()
    .text()
    .replace(/[,.]/g, '')
// above replace replaces the content we get that is 899, to 899 i.e. it removes the comma and do and replace s it witha blank space
    // console.log(price)

    const priceNum = parseInt(price);
    product.price = priceNum;
    // console.log(product);
}   

scrape()