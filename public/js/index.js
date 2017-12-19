var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();

  const messageText = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageText.val()
  }, () => {
    messageText.val('');
  });
});

const locationButton = $('#send-location');

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send location');
  }, () => {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});