const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Dave';
    const text = 'Message from test';
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const from = 'Dave';
    const latitude = 47.6015566;
    const longitude = -122.3345238;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(typeof(locationMessage.createdAt)).toBe('number');
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(url);
    expect(locationMessage).toMatchObject({from, url});

  });
});