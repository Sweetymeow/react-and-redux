# CF_HACKATHON - WEB

```gh
// compile and start project
$ npm start

// build project to distribution
$ npm run build
```
## Data - from Hana use OData

```
// Odata V4 for data query
https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/$metadata
```

## CF - Link
[https://hackathonfe.cfapps.sap.hana.ondemand.com/](https://hackathonfe.cfapps.sap.hana.ondemand.com/)


### Deploy on Cloud Foundry
Include `Staticfile` in root folder for [Staticfile Buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/index.html), which is used by pushing static content to the web in CF.

```
$ cf login
// input password
// select workspace
$ cf push hackathon_webapp

// Show all apps in cf workspace
$ cf apps
```
