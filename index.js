const cheerio = require('cheerio');
const axios = require('axios');
const csvjson = require('csvjson');
const fs = require('fs');

const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];
const people = [];
const quotes = [];
const test = [];
const fields = ['Character', 'Line'];
const opts = {fields};

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
        for(let i = 133; i < titles.length; i++){
          const test = titles[i];
          let scriptURL = `https://ed.fandom.com${test.link}`;

          const res = await axios.get(scriptURL);
          const $ = cheerio.load(res.data);

          const paragrah = $('p');
          const person = $('b');

          paragrah.each(function(){
            text = $(this).html().split('<br>');
            
            for(let i = 0; i < text.length; i++){
              let charLine = text[i].split('</b>');
              
              if(charLine.length === 2){
                quotes.push(charLine);
              }
            }
          });
//           person.each(function(){
//             char = $(this).text();
//             people.push(char);
// ;          });
//           paragrah.contents().each(function(i, element){
    
//             if(element.nodeType === 3){
//               quotes.push($(element).toString().trim())
//             }
//           });

        }

        let counter = 0;
        let peopleCounter = 0;

        for(let i = 0; i < quotes.length; i++){
          const obj = {};
          const [char, line] = quotes[i];

          obj['character'] = `${char}${counter}`;
          obj['line'] = line;
          test.push(obj);
          counter++;
        }
        return test;
   
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
  // const csvData = csvjson.toCSV(res, {
  //   headers: 'key'
  // });

  // fs.writeFile('./edTestData.csv', csvData, (err) => {
  //   if(err){
  //     console.log(err);
  //     throw new Error(err);
  //   }
  //   console.log('Converted Successfully!');
  // })
  console.log('HELLo')

}).catch(error => {
  console.error('ERROR!!');
});

// const things = getTitles(url);








