<template>
  <div class="gvl">
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.message">
        <h1>{{error.message}}</h1>
      </li>
    </ul>
    <ul>
      <div class="venue">
        <h1>gvltonight</h1>
        <hr class="title-divider">
        <ul>
          <li style="margin-top: 0">
            <div><em>live music aggregator for greenville sc</em></div>
          </li>
          <hr class="event-divider">
        </ul>
      </div>
    </ul>
    <ul v-if="collections && collections.length">
      <div class="venue" v-for="col of collections" v-bind:key="col.temporaryId">
        <h1><a v-bind:href="col.url">{{col.header}}</a></h1>
        <hr class="title-divider">
        <ul v-if="col.data.length > 0">
          <li v-for="item of col.data" v-bind:key="item._id">
            <div v-bind:class="{ today: item.isToday }">
              <p v-if="item.sortBy === 'other'">
                <a target="_blank" v-bind:href="item.venue.url">
                  {{item.venue.name}}
                </a>
              </p>
              <p>
                <em>
                  <a target="_blank" onClick="console.log(ga)" v-bind:href="item.url">
                    {{item.title}}
                  </a>
                </em>
              </p>
              <p>
                <span v-if="item.isToday">
                  <span v-bind:class="{ green: item.isToday }">
                    {{item.timeofday}}
                  </span>:
                </span>
                {{item.date}}, {{item.time}}
              </p>
            </div>
            <hr class="event-divider">
          </li>
        </ul>
        <ul v-else>
          <li>
            <p><em>no listed upcoming events for this venue</em></p>
            <hr class="event-divider">
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    errors: [],
    collections: []
  }),

  created () {
    axios.all([
      axios.get(`https://greenvilletonight.com/api/testing`)
    ])
    .then(axios.spread(function (weekResponse) {
      // Converts array of objects into object keys based on sortBy value
      return groupBy(weekResponse.data, 'sortBy')
    }))
    .then(rebuilt => {
      // Adds useful values =>
      // -- { collectionName: { header: 'string', url: 'string', sortOrder: Number, data: [ Array ] } }
      for (let x in rebuilt) {
        let _el = rebuilt[x]
        let _venueName = _el[0].sortBy === 'other' ? _venueName = 'other' : _venueName = _el[0].venue.name
        this.collections.push({
          header: _venueName.toLowerCase(),
          url: _el[0].venue.url,
          sortOrder: _el[0].sortOrder,
          temporaryId: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
          data: rebuilt[x].sort()
        })
      }
      return this.collections
    })
    .then(collectionsObject => {
      return collectionsObject.forEach(topLevObj => {
        topLevObj.data.map(innerObj => {
          if (moment(innerObj.datetime).format(('YYYY-MM-DD')) === moment().format(('YYYY-MM-DD'))) {
            innerObj.isToday = true
            innerObj.timeofday = innerObj.datetime.split('T')[1] > '18:00:00' ? 'TONIGHT' : 'TODAY'
          }
          innerObj.date = moment(innerObj.datetime).format('ddd MM/DD/YYYY')
          innerObj.time = moment(innerObj.datetime).format('h:mm A')
        })
      })
    })
    .then(() => {
      this.collections.sort(function (a, b) {
        return a.sortOrder - b.sortOrder
      })
    })
    .then(() => {
      this.errors = [{message: []}]
      this.collections.forEach(y => {
        this.errors[0].message.push(y.date)
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

// Converts a flat collection of documents into:
// -- { title: [array], title2: [array], etc: [etc] }
// ---- groupBy( {array}, {value in documents to convert into key, and sort by} )
function groupBy (arr, property) {
  return arr.reduce(function (buffer, x) {
    if (!buffer[x[property]]) { buffer[x[property]] = [] }
    buffer[x[property]].push(x)
    return buffer
  }, {})
}
</script>

<style scoped>
.hidden {
  display: none;
}

h1 {
  padding-top: 1.5em;
  font-size: 2em;
  font-weight: normal;
}

hr {
  border-right: 200px solid #fff;
  border-left: 200px solid #fff;
}

hr.title-divider {
  border-top: 1px dashed #bbbbbb;
}

hr.event-divider {
  width: 10px;
  border-top: 1px dashed #eeeeee;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  background: red;
  color: white;
  font-style: normal;
}


ul {
  list-style-type: none;
}

li>div {
  padding: 0.4em 0;
}

.green {
  color: #5b96b4;
}

.today {
  color: #5bb477;
  font-weight: bold;
}
</style>
