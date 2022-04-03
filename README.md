# API for MongoDBs
- James Spickard
- Regis University
- MSSE661 - Web Software Development
- Spring 2022 8 Week 2 Semester
- Professor Morgan Worrell
- April 3, 2022
- Module 4 - Basic Authentication

## Instructions (tested on Windows 10 machine)
1. Ensure node and node package manager is installed on the machine.
2. Ensure mongo is installed on the machine (preferably with MongoDB compass)
3. Open project in VS Code.
4. In VS Code terminal, type "npm install".
5. Run mongod
In mongo installation directory
(i.e.: "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe")
6. In VS Code terminal, type "npm run start".

## Testing
### Get all (using browser or postman)
1. Go to http://localhost:3000/api/quotes
2. All quotes currently in database should appear.

### Create quote (using postman)
1. At http://localhost:3000/api/quotes, perform a POST to body with the desired quote info:
KEY: owner (required)
KEY: quote (required)
KEY: episode (optional)
KEY: air_date (optional)
2. New quote with auto assigned _id should appear as confirmation.

### Get specific quote (using browser or postman)
1. Append a specific quote _id to the end of http://localhost:3000/api/quotes
(i.e.: for "_id":"623e225ac97d2a23b76b548c", use http://localhost:3000/api/quotes/623e225ac97d2a23b76b548c)
2. Requested quote should appear as confirmation.

### Update quote (using postman)
1. At http://localhost:3000/api/quotes with quote _id appended (similar to "Get specific quote section), perform a POST to body with any of the following revised quote info:
KEY: owner
KEY: quote
KEY: episode
KEY: air_date
2. Updated quote with changes should appear as confirmation.

### Delete quote (using browser or postman)
1. At http://localhost:3000/api/quotes with quote _id appended (similar to "Get specific quote section), perform a POST to body with any of the following revised quote info:
KEY: owner
KEY: quote
KEY: episode
KEY: air_date
2. "Deleted successfully. Youre killing independent George!" should appear as confirmation.

### Get random quote (using browser or postman)
1. Go to http://localhost:3000/api/quotes/getrandom
2. A random quote from the database should appear.

### User and Authorization
1. Use in conjuction with Week 4s Class App: https://github.com/jspickard/MSSE661-2022S8W2-class-app.git (see Class App README.md(s) for additional details).

## Recommendations
1. For a more rich _Seinfeld quote experience, the /references/quotes.csv file can be uploaded to the database "MSSE661-2022S8W2" with collections "seinfeld-quotes" using MongoDB Compass.

## References
Hurtado, A. (2020, July 2). Seinfeld Turns 30! Celebrate the Sitcom About Nothing With Over 100 Quotes from the Show. Parade.Com. Retrieved March 26, 2022, from https://parade.com/1043332/alexandra-hurtado/best-seinfeld-quotes/