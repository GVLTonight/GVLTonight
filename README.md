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

## Live Sites
gvltonight.com
avltonight.com
colatonight.com


## Routes:
``` bash
api.gvltonight.com/v1/gvl/events            # all events in db
api.gvltonight.com/v1/gvl/thisweek          # this week's events
api.gvltonight.com/v1/gvl/tonight           # tonights events
api.gvltonight.com/v1/gvl/venue/{venue}
api.gvltonight.com/v1/gvl/venue/{venue}/{startdate}/{enddate}
api.gvltonight.com/v1/gvl/events/{startdate}/{enddate}
```

## Example Routes:
Each city is using the same api. To view another market's events, substitute `gvl` with `avl` or `cola`
``` bash
api.colatonight.com/v1/cola/tonight
api.avltonight.com/v1/avl/tonight
api.gvltonight.com/v1/gvl/tonight

api.gvltonight.com/v1/gvl/venue/other
api.gvltonight.com/v1/gvl/venue/other/1692-06-02/3031-07-09
api.gvltonight.com/v1/gvl/events/1692-06-02/3031-07-09
```

## Venues:
For the update list of accounted for venues, see [GVLTonight-scrubber/dossier.js](https://github.com/GVLTonight/GVLTonight-scrubber/blob/master/dossier.js)
```
GVL
◉ other
◉ gottrocks
◉ groundzero
◉ radioroom
◉ smileys
◉ grandmas
◉ village

COLA
◉ other
◉ main st public ale house
◉ music farm
◉ new brookland
◉ tin roof

AVL
◉ avl music hall
◉ orange peel
◉ grey eagle
◉ civic center
```

## Scripts

***important: Scripts must be run with a city flag.***

Since npm scripts don't handle flags well, the flag MUST come after a ` -- `.

Available cities are `gvl, avl, cola`.

See examples.
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev -- --city=citycode

# build for production with minification
npm run build -- --city=citycode

# build for production and view the bundle analyzer report
npm run build --report -- --city=citycode

# run unit tests
npm run unit -- --city=citycode

# run e2e tests
npm run e2e -- --city=citycode

# run all tests
npm test -- --city=citycode
```
