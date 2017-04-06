var weatherObj = [];
  for (var i = 1; i <= 24; i++) {
  var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.meteo.tn/htmlfr/donnees/testpage.php?gouv="+i;  
 request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
        //temperature = $("[data-variable='temperature'] .wx-value").html();
        var array = $('td[class=m12bvert] b').contents();
        //console.log("region");
        var region = $('td[class=txt14Bb1] b').contents();
        //console.log(region[0]['data']);
        /*
        console.log("array: "+array['0']['data']); 
        console.log("tMin: "+array['1']['data']); 
        console.log("force de vent: "+array['2']['data']); 
        console.log("direction de vent: "+array['3']['data']);
        console.log("demain");
        console.log("array: "+array['4']['data']); 
        console.log("tMin: "+array['5']['data']); 
        console.log("force de vent: "+array['6']['data']); 
        console.log("direction de vent: "+array['7']['data']);*/

        /*var myObj = [{ "tMin":array['0']['data'], "tMax":array['1']['data'], 
        "forceVente":array['2']['data'],"directionVente":array['3']['data']},
        { "tMin":array['4']['data'], "tMax":array['5']['data'], 
        "forceVente":array['6']['data'],"directionVente":array['7']['data']}];
        //myObj.push({ "name":"John", "age":3001, "cisty":"New Yorks"} )
        var myJSON = JSON.stringify(myObj);
        console.log(myJSON);
        */
        weatherObj.push({
                name: region[0]['data'],
                date: "today",
                informations: 
                {
                    tempMin: array['0']['data'],
                    tempMax: array['1']['data'],
                    forceVente: array['2']['data'],
                    directionVente:array['3']['data']
                }
        });
        weatherObj.push({
                name: region[0]['data'],
                date: "tomorrow",
                informations: 
                {
                    tempMin: array['4']['data'],
                    tempMax: array['5']['data'],
                    forceVente: array['6']['data'],
                    directionVente:array['7']['data']
                }
        });
    document.write(weatherObj);
    //document.getElementById("output").innerHTML="weatherObj";
    //return weatherObj;
    //console.log("It’s " + temperature + " degrees Fahrenheit.");
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
}
