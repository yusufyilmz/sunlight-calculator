# node-lexical-density-api

## Available Scripts

In the project directory, you can run:

### `npm install`

Install the necessary packages.

### `npm start`

Runs the app in the development mode.<br>
To make requests to server, you can use [http://localhost:3000](http://localhost:3000) 

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm lint`

Shows the lint errors<br>

##   Features:

- Calculate Sunlight of apartments
- Initialize City


##   Design Specifications :

- Language: Typescript
- Framework: Express.js
- Architecture: Layered architecture

##   Assumptions :

- All distances must be given according to initial point of neighbourhoods
- Initial point of neighbourhoods must be always at the most east part.

###   Calculations :

- Program is written according to the degree between apartment and neighbour buildings. By calculating distance and height difference, degree calculated from tangent value( 

    +   degree = arctan(height(distance)) 

- On the east and west side, i get the maximum of this degree.

- From degree time is calculated by percentage of total hours between sunrise and sunset.

    +   time = degree * ( sunrise time - sunset time) / 180
        Sun start time =  sunrise time + time
        Sun end time =  sunSet time - time


##   API :

### Initialize city  [POST] [/init]

+ Request (application/json)
        
            {
                "neighbourhoods": [{
                    "neighbourhood": "Rocafort",
                    "apartments_height": 2.5,
                    "buildings": [
                        {
                        "name": "A1",
                        "apartments_count": 5,
                        "distance": 10
                        }]
                }]
            }


+ Response 200 (application/json)
        

### Get sunlight of the apartment  [POST] [/getSunlightHours]


+ Request (application/json)
        
            {
                "neighbourhoodName": "Corts",
                "building": "A2",
                "apartmentNumber": 1
            }

+ Response 200 (application/json)
        
            {
                "startTime": "11:42:00",
                "endTime": "13:35:00"
            }


### Error Messages

+ Response 400 (application/json)
        
            {
                "message": "Validation error",
            }

+ Response 400 (application/json)
        
            {
                "message": "Something went wrong",
            }



