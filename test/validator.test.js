const validator = require('../app/validator');

test('checkInterval() with "abc" should return false', () => {
    expect(validator.isIntervalValid('abc')).toBe(false);
});

test('checkInterval() with "123" should return false', () => {
    expect(validator.isIntervalValid('123')).toBe(false);
});

test('checkInterval() with 123 should return false', () => {
    expect(validator.isIntervalValid(123)).toBe(true);
});

test('checkURL() should return false for "abc"', () => {
    expect(validator.isURLValid('abc')).toBe(false);
});

test('checkURL() should return false for "www.example.com"', () => {
    expect(validator.isURLValid('www.example.com')).toBe(false);
});

test('checkURL() should return true for "http://www.example.com"', () => {
    expect(validator.isURLValid('http://www.example.com')).toBe(true);
});

test('checkURL() should return true for "http://www.example.com/testpath"', () => {
    expect(validator.isURLValid('http://www.example.com/testpath')).toBe(true);
});

test('checkURL() should return true for "http://www.example.com/testpath?query=value"', () => {
    expect(validator.isURLValid('http://www.example.com/testpath?query=value')).toBe(true);
});

test('checkURL() should return false for "ftp://example.com/"', () => {
    expect(validator.isURLValid('ftp://example.com/')).toBe(false);
});