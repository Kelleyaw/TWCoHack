// array describing the drivers, sorted by position and with a gap describing the distance from the leading driver
import {global_state, global_county} from '../Index_Page/index.js'
import {global_numCorrect} from '../quiz/Quiz.js'

const leaderboard = [
    {
      county: 'Hamilton',
      state: 'IN',
      score: '100'
    },
    {
      county: 'Cass',
      state: 'IN',
      score: '50'
    },
    {
      county: 'Marion',
      state: 'IN',
      score: '20'
    }
  ];

var score_on_lboard = leaderboard.find(x => x.county === global_county).score
if(score_on_lboard === 'undefined') {
  leaderboard.push({county:global_county, global_state:state, score:global_numCorrect})
}
else {
  score_on_lboard += global_numCorrect
}

// target the table element in which to add one div for each competitor
const main = d3
  .select('table');

// for each driver add one table row
// ! add a class to the row to differentiate the rows from the existing one
// otherwise the select method would target the existing one and include one row less than the required amount
const county = main
  .selectAll('tr.county')
  .data(leaderboard)
  .enter()
  .append('tr')
  .attr('class', 'county');

// in each row add the information specified by the dataset in td elements
// specify a class to style the elements differently with CSS

// position using the index of the data points
county
  .append('td')
  .text((d, i) => i + 1)
  .attr('class', 'place');

county
  .append('td')
  // include the last name in a separate element to style it differently
  // include the team also in another element for the same reason
  .html (({county, state}) => `${county.split(' ').map((part, index) => index > 0 ? `<strong>${part}</strong>` : `${part}`).join(' ')} <span>${state}</span>`)
  // include a border with the color matching the team
  .attr('class', 'county');

county
  .append('td')
  .attr('class', 'score')
  .append('span')
  .text(({score}) => score);