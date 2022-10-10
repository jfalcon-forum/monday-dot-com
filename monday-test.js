// Boards docs https://developer.monday.com/api-reference/docs/boards
// javascript tutorial - https://support.monday.com/hc/en-us/articles/360013465599

import fetch from 'node-fetch'
require('dotenv').config()

// Get all boards 
const getBoards = () => {
  let query = '{ boards (limit:5) {name id} }';

  fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : process.env.MONDAY_SECRET
    },
    body: JSON.stringify({
      'query' : query
    })
    })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
}


// Get single board and info
// Test Value - 3300899346
const getBoard = (board_id) => {
  let query = `{boards(ids:${board_id}) { name id description items { name column_values{title id type text } } } }`;

  fetch ("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : process.env.MONDAY_SECRET
    },
    body: JSON.stringify({
      'query' : query
    })
  })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
}

// Create a board
// Creates on home workspace
let query = 'mutation { create_board (board_name: \"Test Board Created Via API\", board_kind: private, workspace_id: 1946259, board_owner_ids: [35107912]) {   id }}';

fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : process.env.MONDAY_SECRET
  },
   body: JSON.stringify({
     'query' : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));