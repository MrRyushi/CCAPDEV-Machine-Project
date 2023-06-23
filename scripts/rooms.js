$(document).ready(function(){
    // This code is to generate the current date
    document.getElementById('date').valueAsDate = new Date();
  
    // The next lines of code is for reserving seats
    const form = document.querySelector('.reserve-form');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
      
      alert('Please sign in to reserve a seat.');
    });
  })
  