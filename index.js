const cheerio = require('cheerio');
const axios = require('axios');


const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];
const people = [];
const quotes = [];
const obj = {};

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

        let counter = 0;
        let peopleCounter = 0;

        for(let i = 0; i < quotes.length; i++){
          if(people[i] === undefined){
            obj[`unknown${counter}`] = quotes[i];
            counter++;
          } else {
            obj[`${people[i]}${peopleCounter}`] = quotes[i];
            peopleCounter++;
          }
        }
        return obj;
   
      } catch(error){
        console.error(error);
      }
    }
    const data = await getQuotes(titles);
    return data;
  } catch(error){
    console.error(error);
  }
};

getTitles(url).then(res => {
  console.log('HELLO');
}).catch(error => {
  console.error('ERROR!!');
});

// const things = getTitles(url);








