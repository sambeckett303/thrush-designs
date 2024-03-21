window.onload = function() {
document.getElementById('cs-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
  
    // Show loading message
    document.getElementById('fadeBg').style.display = 'block';
    document.getElementById('loading').style.display = 'block';
  
    fetch('/.netlify/functions/contact-submitted', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        // Hide loading message
        document.getElementById('loading').style.display = 'none';
        // Show success message
        document.getElementById('success').style.display = 'block';
      } else {
        throw new Error('Server responded with an error!');
      }
    })
    .catch(error => {
      // Hide loading message
      document.getElementById('loading').style.display = 'none';
      // Show failure message
      document.getElementById('error').style.display = 'block';
      console.error('Error:', error);
    });
});

var closeElements = document.getElementsByClassName('close');
for(let i = 0; i < closeElements.length; i++) {
    closeElements[i].addEventListener("click", function() {
        document.getElementById('fadeBg').style.display = 'none';
        document.getElementById('success').style.display = 'none';
        document.getElementById('error').style.display = 'none';
    });
}
};
