Weather API
=============================

The Weather API is a service, which is able to deliver weather forecast data for any given location on Tunisia.

For that i use a scraper for meteo.tn.

This API is written in [JavaScript].



**Show City Informations**
----
  Returns json data about a city.

* **URL**

    https://meteotnapi.herokuapp.com/api

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `city=[cityName]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"today":{"tempMin":" 17ºC","tempMax":" 20\tºC","forceVente":" 25 km/h","img":"http://www.meteo.tn/htmlfr/donnees/images/images_gouvernorats/020.jpg","directionVente":" NE"},"tomorrow":{"tempMin":" 15ºC","tempMax":" 25ºC","forceVente":" 20 km/h","img":"http://www.meteo.tn/htmlfr/donnees/images/images_gouvernorats/020.jpg","directionVente":" SE"}}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "City doesn't exist !" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "https://meteotnapi.herokuapp.com/api?city=Sousse",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
