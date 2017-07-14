// import Vue from 'vue'
import {
  groupBySorter
  // accessorize,
  // rebuild
} from '../../../src/utils/dataTransformations.js'
// import test from '../..'
// /Users/KB/Documents/_-Projects/Workspace/GVLTonight/src/utils/dataTransformations.js
// /Users/KB/Documents/_-Projects/Workspace/GVLTonight/test/unit/specs/Utils.spec.js

var sampleArray = [{'_id': '5962766bf33bac942785bbc2', 'groupBy': 'orangepeel', 'sortOrder': 1000, 'title': 'Tom Segura - SOLD OUT', 'description': 'too long', 'url': 'https://facebook.com/693248640860471', 'time': '19:30:00', 'date': '2017-07-14', 'datetime': '2017-07-14T19:30:00-0400', 'venue': {'name': 'The Orange Peel', 'url': 'https://facebook.com/110322765681142', 'latitude': 35.591422352493, 'longitude': -82.551142738639, 'country': 'United States', 'city': 'Asheville', 'state': 'NC', 'street': '101 Biltmore Ave', 'zip': '28801'}, 'updated': '2017-07-14T05:00:04.088Z'}, {'_id': '5965acd4f33bac942785bbec', 'groupBy': 'greyeagle', 'sortOrder': 2000, 'title': 'A Memphis Music Revue with Amy Black at The Grey Eagle', 'description': 'too long', 'url': 'https://facebook.com/2460147087459335', 'time': '20:00:00', 'date': '2017-07-14', 'datetime': '2017-07-14T20:00:00-0400', 'venue': {'name': 'The Grey Eagle', 'url': 'https://facebook.com/162139570507076', 'latitude': 35.587092570796, 'longitude': -82.564479100751, 'country': 'United States', 'city': 'Asheville', 'state': 'NC', 'street': '185 Clingman Ave', 'zip': '28801'}, 'updated': '2017-07-14T05:00:04.093Z'}]

describe('Utils.js', () => {
  it('groupBySorter(arr, key) should return an array two index positions from sample array', () => {
    expect(Object.keys(groupBySorter(sampleArray, 'groupBy')))
      .to.have.lengthOf(2)
  })
  // IDK =>
  // it('accessorize()', () => {
  //   var test = groupBySorter(sampleArray, 'foo')
  //   console.log(accessorize(test))
  // })
})
