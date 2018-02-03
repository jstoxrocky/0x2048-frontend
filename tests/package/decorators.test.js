import * as exceptions from '../../src/package/exceptions';
import {
  handleMetaMaskErrors,
  handleServerErrors,
} from '../../src/package/decorators';

describe('handleMetaMaskErrors', () => {
  it('should throw MetamaskError', async () => {
    const baseFunc = () => Promise.reject();
    const wrappedFunc = handleMetaMaskErrors(baseFunc);
    await expect(wrappedFunc()).rejects.toEqual(exceptions.MetamaskError);
  });

  it('should succeed', async () => {
    const expected = 1337;
    const baseFunc = () => Promise.resolve(expected);
    const wrappedFunc = handleMetaMaskErrors(baseFunc);
    const output = await wrappedFunc();
    expect(output).toBe(expected);
  });
});

describe('handleServerErrors', () => {
  it('should throw ServerError', async () => {
    const baseFunc = () => Promise.reject();
    const wrappedFunc = handleServerErrors(baseFunc);
    await expect(wrappedFunc()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 1337;
    const baseFunc = () => Promise.resolve(expected);
    const wrappedFunc = handleServerErrors(baseFunc);
    const output = await wrappedFunc();
    expect(output).toBe(expected);
  });
});
