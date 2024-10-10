Alustamiseks avage projekt oma koodiredaktoris. 
Seejärel avage terminal ja leidke see projektist. 
Projekt töötab Node ' is.js v14.17.5.
Seejärel tippige järgmine käsk: npm i.see käsk määrab kõik projekti jaoks vajalikud seaded.
Lepingute nimekiri:

@babel / core: Babeli Põhiteek muudab kaasaegse JavaScripti vanemate brauserite ühilduvateks versioonideks.
@babel / preset-env: sisaldab automaatselt vajalikke Babeli pistikprogramme ja polüfille, mis põhinevad kaasaegse JavaScripti ühilduvuse sihtkeskkondadel.
babel-loader: integreerib Babeli Webpackiga, et JavaScripti faile ehitamise ajal üle kanda.
core-js: pakub Polyfills ECMAScripti funktsioonide jaoks, võimaldades kaasaegse JavaScripti kasutamist vanemates keskkondades.
json-server: loob kiiresti RESTful API, kasutades JSON-faili prototüüpide ja testimise andmebaasina.
webpack: moodulikomplekt, mis töötleb ja optimeerib veebirakenduste varasid (JavaScript, CSS, pildid).
webpack-cli: käsurea liides Webpacki käskude käitamiseks ja konfiguratsioonide haldamiseks terminalist.

Seejärel tippige see käsk: npx json-server --watch db.json.
Alustame projekti veebiserveris