# Mongo
Download en installeer MongoDB en MongoSH (shell).
Bekijk de onderstaande tutorial over Mongo voor het bedienen vanaf de terminal.
Plaats verwijzing naar MongoDB in het `.env` bestand.

NODE_ENV=development
DB_STRING=<your db string>
DB_STRING_PROD=<your db string>


# Public key / Private key
Maak een keypair aan met behulp van generateKeypair.js met onderstaande commando in de terminal.
node generateKeypair.js

Op een productionserver moet MongoD als service draaien (daemon).


# Gitignore
Maak een .gitignore aan waarin tenminste de volgende drie zijn opgenomen.

node_modules/
id_rsa_priv.pem
.env


# Opstarten
Installeer de node_modules. 
npm i

Voer de onderstaande scripts uit voor het starten van de applicatie.

npm run dev      (development)
npm run start    (production)

Bezoek pagina `http://localhost:3000` in de browser.


# Tutorials
https://youtu.be/o6mSdG09yOU  JWT
https://youtu.be/Ne0tLHm1juE  JWT
https://youtu.be/ofme2o29ngU  Mongo