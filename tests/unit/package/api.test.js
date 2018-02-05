import sinon from 'sinon';
import * as exceptions from '../../../src/package/exceptions';
import * as baseApi from '../../../src/package/base-api';
import { move, price } from '../../../src/package/api';

describe('handle move', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'unhandledMove');
  });

  afterEach(() => {
    baseApi.unhandledMove.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.unhandledMove.returns(Promise.reject());
    await expect(move()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.unhandledMove.returns(Promise.resolve(expected));
    const output = await move();
    expect(output).toBe(expected);
  });
});

describe('handle price', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'unhandledPrice');
  });

  afterEach(() => {
    baseApi.unhandledPrice.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.unhandledPrice.returns(Promise.reject());
    await expect(price()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.unhandledPrice.returns(Promise.resolve(expected));
    const output = await price();
    expect(output).toBe(expected);
  });
});
