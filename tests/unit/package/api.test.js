import sinon from 'sinon';
import * as exceptions from '../../../src/package/exceptions';
import * as baseApi from '../../../src/package/base-api';
import { move, gameState, iou, nonce } from '../../../src/package/api';

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

describe('handle iou', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'iou');
  });

  afterEach(() => {
    baseApi.iou.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.iou.returns(Promise.reject());
    await expect(iou()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.iou.returns(Promise.resolve(expected));
    const output = await iou();
    expect(output).toBe(expected);
  });
});

describe('handle nonce', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'nonce');
  });

  afterEach(() => {
    baseApi.nonce.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.nonce.returns(Promise.reject());
    await expect(nonce()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.nonce.returns(Promise.resolve(expected));
    const output = await nonce();
    expect(output).toBe(expected);
  });
});
