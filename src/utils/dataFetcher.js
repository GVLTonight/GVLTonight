import axios from 'axios'
import {groupBySorter, rebuild} from '../utils/dataTransformations'

export default function dataFetcher (proc, sortOption) {
  return new Promise((resolve) => {
    resolve(axios.all([
      // axios.get(`http://localhost:8000/v1/tonight`),
      // axios.get(`http://localhost:8000/v1/events/${tomorrow}/${endOfWeek}`)
      axios.get(proc.VARIANT.ajax[0]),
      axios.get(proc.VARIANT.ajax[1])
    ])
    // axios.spread returns an array ie: function (will_be_index[0], will_be_index[1]) { }
    .then(
      axios.spread(function (tonight, week) {
        return {
          day: groupBySorter(week.data, 'dayOfWeek'),
          week: groupBySorter(week.data, 'groupBy'),
          tonight: groupBySorter(tonight.data, 'groupBy')
        }
      })
    )
    .then(rebuilt => {
      return {
        dayOfWeek: rebuild(rebuilt, 'day'),
        week: rebuild(rebuilt, 'week'),
        tonight: rebuild(rebuilt, 'tonight')
      }
    })
    .catch(e => {
      console.log(e)
    }))
  })
}
