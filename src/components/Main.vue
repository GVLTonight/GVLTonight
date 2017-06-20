<template>
  <div class="main">

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>

    <ul>
      <div class="venue">
        <h1>gvltonight</h1>
        <hr class="title-divider" />
        <ul>
          <li style="margin-top: 0">
            <p><em>live music aggregator for greenville sc</em></p>
            <hr class="event-divider" />
          </li>
        </ul>
      </div>
    </ul>

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
                <span v-bind:class="{ hidden: !item.isToday }">
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
import axios from 'axios'
// import moment from 'moment'

export default {
  data: () => ({
    errors: [],
    collections: [
      {
        header: 'the radio room',
        url: 'http://www.radioroomgreenville.com/',
        data: []
      },
      {
        header: 'gottrocks',
        url: 'http://www.gottrocksgreenville.com/',
        data: []
      },
      {
        header: 'groundZero',
        url: 'http://www.groundzeromedia.org/',
        data: []
      },
      {
        header: 'smiley\'s acoustic cafe',
        url: 'http://www.smileysacousticcafe.com/',
        data: []
      },
      {
        header: 'village',
        url: 'https://www.facebook.com/villagewgvl/',
        data: []
      },
      {
        header: 'other',
        data: []
      }
    ]
  }),

  // Fetches events when the component is created.
  created () {
    axios.get(`https://greenvilletonight.com/api/thisweek`)
    .then(response => {
      this.posts = response.data
      let res = response.data

      res.forEach(y => {
        if (moment(y.datetime).format(('YYYY-MM-DD')) === moment().format(('YYYY-MM-DD'))) {
          y.isToday = true
        }
        y.date = moment(y.datetime).format('ddd MM/DD/YYYY')
        y.time = moment(y.datetime).format('h:mm A')
        y.timeofday = y.datetime.split('T')[1] > '18:00:00' ? 'TONIGHT' : 'TODAY'
        if (y.collection === 'radioroom') {
          this.collections[0].data.push(y)
        } else if (y.collection === 'gottrocks') {
          this.collections[1].data.push(y)
        } else if (y.collection === 'groundzero') {
          this.collections[2].data.push(y)
        } else if (y.collection === 'smileys') {
          this.collections[3].data.push(y)
        } else if (y.collection === 'village') {
          this.collections[4].data.push(y)
        } else if (y.collection === 'other') {
          this.collections[5].data.push(y)
        }
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}

// function groupBy (arr, property) {
//   return arr.reduce(function (buffer, x) {
//     if (!buffer[x[property]]) { buffer[x[property]] = [] }
//     buffer[x[property]].push(x)
//     return buffer
//   }, {})
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hidden {
  display: none;
}

hr.title-divider {
	border-top: 1px dashed #bbbbbb;
  border-left: 200px solid #fff;
  border-right: 200px solid #fff;
  /*width: 100px;*/
}

hr.event-divider {
	border-top: 1px dashed #eeeeee;
  border-left: 200px solid #fff;
  border-right: 200px solid #fff;
  width: 10px;
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

h1, h2 {
  font-weight: normal;
}

h1 {
  margin-bottom: -10px;
  margin-top: 50px;
  /*font-weight: bold;*/
  /*color: #5bb477;*/
}

.green {
  color: #5b96b4;
}

.today {
  color: #5bb477;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

p {
  margin: 0;
}



</style>
