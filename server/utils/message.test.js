const expect = require('expect');

const {generateMessage} = require('./message');

describe('generate message', () => {
  it('should generate the correct message object', () => {
    const from = 'Dave';
    const text = 'Message from test'
    var message = generateMessage(from, text);

    expect(typeof(message.createdAt)).toBe('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);

  });
});