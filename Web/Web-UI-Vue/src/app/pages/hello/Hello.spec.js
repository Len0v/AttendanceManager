import Hello from './Hello.vue';

describe('hello', () => {
  it('should be a hello', () => {
    expect(Hello.name).toEqual('Hello');
  });
});
