# MetaQuotes

## Build and run

Install dependencies and build project:

> npm run build

Start webpack dev server and open in browser:

> npm run start

## Task description

(on Russian) https://www.metaquotes.net/ru/company/vacancies/tests/javascript

### Task

Develop a client for data visualization, which is storing an archive
of temperature and precipitation changes for the last 120 years

### Development tools

-   HTML5/CSS3
-   JavaScript/TypeScript without 3rd party libraries and tools

### Code requirements

-   Single Page Application
-   Source code should be written with the same style and has comments
-   Allow to use last JS features (Chrome, Firefox, IE11, Edge)
-   Source code shouldn't be obfuscated

### Technical requirements

-   [Done] Application consists of two parts - selection of data type and graphic with visualisation
-   [Done] **Temperature** data should be visualized by default
-   Data should be stored in IndexedDB, in two tables: temperature and precipitation
-   Each data for a day should be stored as an independent object/record in IndexedDb
-   [Done] Data should be requested from the server if it doesn't found in IndexedDB
-   [Done] Each portion of data (temperature, precipitation) should be requested independently
-   [Done] Backend could be implemented as a simple webserver or any bundler (Webpack/Rollup/Vite/Snowpack)
-   All records should be visualised by default (from 1881 to 2006 years, 46020 records)
-   [Done] There shouldn't be any calculations on backend
-   [Done] It is possible to change visualisation period by the interface
-   [Done] Use html canvas element for data visualisation
-   [] While calculation and drawing interface shouldn't be frozen
-   [] Allowed to calculate anything inside workers

### Additional

-   The manifestation of the initiative beyond the main task is welcome
-   Speed and performance are the main focuses (interface and data visualisation)
