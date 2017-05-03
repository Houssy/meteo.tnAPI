var express = require('express')
var app = express()
var urlParse = require('url');

app.set('port', (process.env.PORT || 5000))

app.get('/*', function(request, response) {
  var query = urlParse.parse(request.url, true).query;
  var pathname = urlParse.parse(request.url, true).pathname;
  if(pathname=='/api' && query['city']!=null){
    var c =false;
    for(var key in weatherObj){ 
        if(weatherObj[key]['name']==query['city']){
            response.send(weatherObj[key]['informations']);
            c = true;
        }
    }
    if(!c){
        response.send("Ops! "+query['city']+" n'existe plus !");
    }
    //response.send(c)
    //response.send('-------------------------------------------------------')
    //response.send(weatherObj[query['city']])
  }else{
    response.send("Merci de verifier votre requette!");
  }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

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
                informations: 
                {
                        today:
                        {
                        tempMin: array['0']['data'],
                        tempMax: array['1']['data'],
                        forceVente: array['2']['data'],
                        img: "http://www.meteo.tn/htmlfr/donnees/images/images_gouvernorats/0"+i+".jpg",
                        directionVente:array['3']['data']
                        },
                        tomorrow:{
                        tempMin: array['4']['data'],
                        tempMax: array['5']['data'],
                        forceVente: array['6']['data'],
                        img: "http://www.meteo.tn/htmlfr/donnees/images/images_gouvernorats/0"+i+".jpg",
                        directionVente:array['7']['data']
                        }
                }
            
        });
        console.log(weatherObj);
    //document.write(weatherObj);
    //document.getElementById("output").innerHTML="weatherObj";
    //return weatherObj;
    //console.log("It’s " + temperature + " degrees Fahrenheit.");
  } else {
    console.loadg("We’ve encountered an error: " + error);
  }
});
}
