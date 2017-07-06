## requires keys file to be present in project root folder
``` json
{
	"mlab": "mlab_URI",
	"fb": "fb_key"
}
```

## Schema Structure:
``` javascript
{
    groupBy:            String,
    sortOrder:          Number,
    updated: {
        type:           Date,
        default:        Date.now,
    },
    venue: {
        name:           String,
        url:            String,
        latitude:       Number,
        longitude:      Number,
        country:        String,
        city:           String,
        state:          String,
        street:         String,
        zip:            String,
    },
    title:              String,
    description:        String,
    url:                String,
    time:               String,
    date:               String,
    datetime:           String,
}
```

## Routes:
```
api.gvltonight.com.com/v1/events            # all events in db
api.gvltonight.com.com/v1/thisweek          # this week's events
api.gvltonight.com.com/v1/tonight           # tonights events
api.gvltonight.com.com/v1/venue/{venue}
api.gvltonight.com.com/v1/venue/{venue}/{startdate}/{enddate}
api.gvltonight.com.com/v1/events/{startdate}/{enddate}
```

## Example Routes:
```
api.gvltonight.com.com/v1/venue/other
api.gvltonight.com.com/v1/venue/other/3030-06-02/3031-07-09
api.gvltonight.com.com/v1/events/3030-06-02/3031-07-09
```


## Venues:
```
◉ other
◉ gottrocks
◉ groundzero
◉ radioroom
◉ smileys
```

## Scripts
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```