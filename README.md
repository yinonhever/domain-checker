## About the project

The system, built with Node.js and TypeScript, is made of several services:

- **A REST API built with Express**, responsible for saving domains in the database for later analysis, as well as retrieving the current data from the last scan for each domain. The API also saves logs of every request it receives to the database.

- **A scheduled automation that scans all the domains** in the database, collects security information about them from third-party APIs, and saves the information collected in every scan to the database. The automation is scheduled using the _node-cron_ library, and its interval is configurable inside the _automations/index.ts_ file. By default, the automation runs once per month – on the 1st of every month at 00:00.

- **A MongoDB database**, integrated with the app using deeply-structured Mongoose models and schemas.

The project is built in a scalable way that would make it easy to add more scheduled automations with different intervals, more API routes and any additional functionalities.
