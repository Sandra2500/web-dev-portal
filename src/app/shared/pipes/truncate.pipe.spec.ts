import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original string if length is less than limit', () => {
    const shortText = 'Hello World';
    expect(pipe.transform(shortText, 20)).toBe('Hello World');
  });

  it('should truncate string and add "..." if longer than limit', () => {
    const longText = 'This is a very long text that should be truncated';
    const expected = 'This is a very long text that...';
    expect(pipe.transform(longText, 30)).toBe(expected);
  });

  it('should use default limit of 50 if not specified', () => {
    const text = 'a'.repeat(60);
    expect(pipe.transform(text)).toBe('a'.repeat(50) + '...');
  });

  it('should return empty string for null or undefined', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
  });
});
