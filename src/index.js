//  list of variables that are used to reference different HTML elements on the page.
const filmTitle = document.getElementById('title');
const runTime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showTime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const button = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const filmList = document.getElementById('films')

//  removes all child elements from the element and replaces them with new child elements.
filmList.replaceChildren();  
// function fetch data from the db.json server
function getAllfilms(id = 1){
    fetch("http://localhost:3000/films{id}", id)
    .then(res => res.json())
    .then(item => {
        setPosterDetails(item);
    })
}
// function that set all poster details
function setPosterDetails(item){
    filmTitle.innerHTML = item.title;
    runTime.innerHTML = ${item.runtime} minutes;
    filmInfo.innerHTML = item.description;
    showTime.innerHTML = item.showtime;
    poster.src = item.poster;
    ticketNum.innerHTML = (item.capacity - item.tickets_sold)
    let remainingTickets = (item.capacity - item.tickets_sold)
    ticketNumber(remainingTickets);
}
// function to list all items of a single element in the films array 
// contains an event listener that listens to the click event
function listFilm(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(item => {
        item.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title.toUpperCase();
            filmList.append(filmItem);
            filmItem.addEventListener('click', (e) => {
                e.preventDefault();
                setPosterDetails(film);
            })
        })
        
    })
    
}
//  function that calculates the number of tickets available 
//  it contains an event listener that listens for a click on the button and
// returns the total tickets - 1
// also returns sold out message when tickets get sold out
function ticketNumber(remainingTickets){
    button.addEventListener('click',(e) => {
        e.preventDefault();
            if (remainingTickets > 0){
                remainingTickets --;
            ticketNum.textContent = remainingTickets;
            }
            else if (remainingTickets <= 0){
                button.innerHTML = "Sold Out"
               
            }
        })
        
    }

// this function initializes the getAllfilms and listFilm functions that have been called within the 
// function

function initialize(){
    getAllfilms();
    listFilm()
    
}
// calls and initializes the initialize function
initialize();
