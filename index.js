const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];

async function getTitles(url){
  try{
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const titeLink = $(".category-page__member-link");
    titeLink.each(function(){
      title = $(this).text();
      link = $(this).attr('href');

      let test = title.split(' ')[0];

      if(test !== 'Template:Scripts/Season' && test !== 'Category:Crossover' && test !== 'Category:Season'){
        console.log(title)
        titles.push({
          title,
          link
        });
      }
    });

    // async function getQuotes(){
      
    // }


  } catch(error){
    console.error(error);
  }
};

getTitles(url);
