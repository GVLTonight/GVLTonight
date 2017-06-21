<template>
  <div class="testing">
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        <h1>{{error.message}}</h1>
      </li>
    </ul>
    <!--{{raw}}-->
    <ul v-if="collections && collections.length">
      <div class="venue" v-for="col of collections">
        <h1><a v-bind:href="col.url">{{col.header}}</a></h1>
        <hr class="title-divider" />
        <ul v-if="col.data.length > 0">
          <li v-for="item of col.data">
            <div v-bind:class="{ today: item.isToday }">
              <p v-if="item.collection === 'other' || item.collection === 'village'">
                <a v-bind:href="item.venueUrl">
                  {{item.venue}}
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
            <hr class="event-divider" />
          </li>
        </ul>
        <ul v-else>
          <li>
            <p><em>no listed upcoming events for this venue</em></p>
            <hr class="event-divider" />
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
    axios.get(`https://greenvilletonight.com/api/thisweek`)
    .then(response => {
      // Converts array of objects into objects based on collection name
      // -- then adds useful values ie =>
      // ---- { collectionName: { header: 'string', url: 'string', data: [ Array ] } }
      return groupBy(response.data, 'collection')
    })
    .then(rebuilt => {
      for (let x in rebuilt) {
        let el = rebuilt[x]
        let venue = el[0].collection === 'other' ? venue = 'other' : venue = el[0].venue

        this.collections.push({
          header: venue.toLowerCase(),
          url: el[0].venueUrl,
          data: rebuilt[x].sort()
        })
      }
      return this.collections
    })
    .then(events => {
      return events.forEach(y => {
        y.data.map(x => {
          if (moment(x.datetime).format(('YYYY-MM-DD')) === moment().format(('YYYY-MM-DD'))) {
            x.isToday = true
            x.timeofday = x.datetime.split('T')[1] > '18:00:00' ? 'TONIGHT' : 'TODAY'
          }
          x.date = moment(x.datetime).format('ddd MM/DD/YYYY')
          x.time = moment(x.datetime).format('h:mm A')
        })
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

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
