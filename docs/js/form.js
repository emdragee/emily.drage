document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Sending your message...'; // Show a loading message
  
    const form = event.target;
    const formData = new FormData(form);
  
    fetch('https://formsubmit.co/emily.drage@outlook.com', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then((text) => {
        responseDiv.innerText = 'Your message has been sent!';
        form.reset();
      })
      .catch((error) => {
        responseDiv.innerText = 'There was a problem sending your message.';
        console.error('Error:', error);
      });
  });
  