// array describing the drivers, sorted by position and with a gap describing the distance from the leading driver
const leaderboard = [
    {
      name: 'Alex',
      state: 'IN',
      score: '100'
    },
    {
      name: 'Kevin',
      state: 'CA',
      score: '50'
    },
    {
      name: 'Helen',
      state: 'NY',
      score: '20'
    }
  ];

// target the table element in which to add one div for each competitor
const main = d3
  .select('table');

// for each driver add one table row
// ! add a class to the row to differentiate the rows from the existing one
// otherwise the select method would target the existing one and include one row less than the required amount
const competitor = main
  .selectAll('tr.competitor')
  .data(leaderboard)
  .enter()
  .append('tr')
  .attr('class', 'competitor');

// in each row add the information specified by the dataset in td elements
// specify a class to style the elements differently with CSS

// position using the index of the data points
competitor
  .append('td')
  .text((d, i) => i + 1)
  .attr('class', 'place');

competitor
  .append('td')
  // include the last name in a separate element to style it differently
  // include the team also in another element for the same reason
  .html (({name, state}) => `${name.split(' ').map((part, index) => index > 0 ? `<strong>${part}</strong>` : `${part}`).join(' ')} <span>${state}</span>`)
  // include a border with the color matching the team
  .attr('class', 'competitor');

competitor
  .append('td')
  .attr('class', 'score')
  .append('span')
  .text(({score}) => score);