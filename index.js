const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];
const people = [];
const quotes = [];

async function getTitles(url){
  try{
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const titeLink = $(".category-page__member-link");
    titeLink.each(function(){
      title = $(this).text();
      link = $(this).attr('href');

      let test = title.split(' ')[0];

      const ignore = {
        'Template:Scripts/Season': true,
        'Category:Crossover': true,
        'Category:Season': true,
      };

      if(!(ignore[test])){
        titles.push({
          title,
          link
        });
      }
    });

    async function getQuotes(titles){
      try{
        for(let i = 0; i < 1; i++){
          const test = titles[i];
          let scriptURL = `https://ed.fandom.com${test.link}`;

          const res = await axios.get(scriptURL);
          const $ = cheerio.load(res.data);

          const paragrah = $('p');
          const person = $('b');

          // paragrah.each(function(){
          //   text = $(this).html().split('<br>');
          //   console.log(text);
          // });
          person.each(function(){
            char = $(this).text();
            people.push(char);
;          });
          paragrah.contents().each(function(i, element){
    
            if(element.nodeType === 3){
              quotes.push($(element).toString().trim())
            }
          });

        }
        console.log(people.length);
        console.log(quotes.length);
      } catch(error){
        console.error(error);
      }
    }
    getQuotes(titles);

  } catch(error){
    console.error(error);
  }
};

getTitles(url);
