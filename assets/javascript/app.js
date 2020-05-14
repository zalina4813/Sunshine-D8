$('document').ready(function() {

    $('#searchCity').keypress(function(e) {
        // Waiting for the user to press the enter key
        if(e.keyCode === 13) {
            console.log('blue')
            // This will clear the input field that the user typed into
            $('#city').val('')
        }
    
    })

    var modal = document.getElementById('id01'); 
  
        window.onclick = function(event) { 
            preventDefault();
            if (event.target == modal) { 
                modal.style.display = "none"; 
            } 
        } 
    
})
    