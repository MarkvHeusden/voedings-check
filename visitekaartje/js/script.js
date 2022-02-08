const card = document.querySelector('main');

// Trigger alleen functie als er niet op een child van de main wordt geklikt.
card.addEventListener('click', function(e){
    e = window.event || e; 
    if(this === e.target) {
        card.classList.toggle('closed');
    }
});


// card.addEventListener('click', (e) => {
//     e = window.event || e; 
//     if(this === e.target) {
//         card.classList.toggle('closed');
//     }
// });