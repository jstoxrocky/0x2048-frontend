import sinon from 'sinon';
import * as exceptions from '../../../src/package/exceptions';
import * as baseApi from '../../../src/package/base-api';
import { move, price, gameState } from '../../../src/package/api';

describe('handle gameState', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'gameState');
  });

  afterEach(() => {
    baseApi.gameState.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.gameState.returns(Promise.reject());
    await expect(gameState()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.gameState.returns(Promise.resolve(expected));
    const output = await gameState();
    expect(output).toBe(expected);
  });
});

describe('handle move', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'move');
  });

  afterEach(() => {
    baseApi.move.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.move.returns(Promise.reject());
    await expect(move()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.move.returns(Promise.resolve(expected));
    const output = await move();
    expect(output).toBe(expected);
  });
});

describe('handle price', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'price');
  });

  afterEach(() => {
    baseApi.price.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.price.returns(Promise.reject());
    await expect(price()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.price.returns(Promise.resolve(expected));
    const output = await price();
    expect(output).toBe(expected);
  });
});
