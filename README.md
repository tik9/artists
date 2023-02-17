### Get Artists from Last FM Api

#### Steps to install and run the TS code
Precondition: get api key from lastfm and put it in ".env", see ".env.example"

1. git clone https://github.com/tik9/artists
2. yarn install
3. yarn start


#### Tests with result

1. curl localhost:3000?artist=cher&csvname=example
- Information about artists with "cher" in the name will be stored as CSV in folder "public" to a csv file with name given in the query
- Response: ok, 200
  
2. curl localhost:3000?artist=xssxs&csvname=example
- Artist1 and Artist2 will be stored in the csv file coming from "public/artists.json"
- Response: ok, 200

3. Response: 'Parameter required', 400 Bad Request
- curl localhost:3000?artist=xssxs
- curl localhost:3000 
- curl localhost:3000?csvname=example 
  
