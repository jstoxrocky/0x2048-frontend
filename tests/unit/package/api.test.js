import sinon from 'sinon';
import * as exceptions from '../../../src/package/exceptions';
import * as baseApi from '../../../src/package/base-api';
import { move, gameState, postIOU, getIOU } from '../../../src/package/api';

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

describe('handle postIOU', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'postIOU');
  });

  afterEach(() => {
    baseApi.postIOU.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.postIOU.returns(Promise.reject());
    await expect(postIOU()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.postIOU.returns(Promise.resolve(expected));
    const output = await postIOU();
    expect(output).toBe(expected);
  });
});

describe('handle getIOU', () => {
  beforeEach(() => {
    sinon.stub(baseApi, 'getIOU');
  });

  afterEach(() => {
    baseApi.getIOU.restore();
  });

  it('should throw ServerError', async () => {
    baseApi.getIOU.returns(Promise.reject());
    await expect(getIOU()).rejects.toEqual(exceptions.ServerError);
  });

  it('should succeed', async () => {
    const expected = 4;
    baseApi.getIOU.returns(Promise.resolve(expected));
    const output = await getIOU();
    expect(output).toBe(expected);
  });
});
