const cheerio = require('cheerio');
const axios = require('axios');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');

const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];
const quotes = [];
const test = [];

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
        for(let i = 0; i < titles.length; i++){
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

        }

        for(let i = 0; i < quotes.length; i++){
          const obj = {};
          const [char, line] = quotes[i];

          let breakOne = char.split('>')[1];
          let newChar = breakOne.split(':')[0];

          obj['character'] = `${newChar}`;
          obj['line'] = line;
          test.push(obj);
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

const specificChar = [];

// getTitles(url).then(res => {
//   for(let i = 0; i < res.length; i++){
//     let charObj = res[i];

//     if(charObj['character'] === 'Rolf'){
//       specificChar.push(charObj);
//     }
//   }

//   const csvData = csvjson.toCSV(specificChar, {
//     headers: 'key'
//   });

//   fs.writeFile('./edTestData.csv', csvData, (err) => {
//     if(err){
//       console.log(err);
//       throw new Error(err);
//     }
//     console.log('Converted Successfully!');
//   })
//   //console.log(specificChar)

// }).catch(error => {
//   console.error('ERROR!!');
// });


