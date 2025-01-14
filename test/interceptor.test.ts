import { store } from '../src';
import { metaStore } from '../src/store/metaStore';
import { basicModel } from './models/basic-model';

beforeEach(() => {
  store.init();
  metaStore.helper.refresh();
});

afterEach(() => {
  store.unmount();
});

test('dispatch the same state should be intercepted', () => {
  const fn = jest.fn();
  const unsubscribe = store.subscribe(fn);

  expect(fn).toHaveBeenCalledTimes(0);
  basicModel.set(100);
  expect(fn).toHaveBeenCalledTimes(1);
  basicModel.set(100);
  basicModel.set(100);
  expect(fn).toHaveBeenCalledTimes(1);
  basicModel.set(101);
  expect(fn).toHaveBeenCalledTimes(2);

  unsubscribe();
  fn.mockRestore();
});

test('dispatch the same meta should be intercepted', async () => {
  const fn = jest.fn();
  const unsubscribe = metaStore.subscribe(fn);

  metaStore.helper.inactivate(basicModel.name, 'pureAsync');

  expect(fn).toHaveBeenCalledTimes(0);
  await basicModel.pureAsync();
  await basicModel.pureAsync();
  expect(fn).toHaveBeenCalledTimes(0);

  metaStore.helper.activate(basicModel.name, 'pureAsync');

  await basicModel.pureAsync();
  expect(fn).toHaveBeenCalledTimes(2);
  await basicModel.pureAsync();
  await basicModel.pureAsync();
  expect(fn).toHaveBeenCalledTimes(6);
  await Promise.all([basicModel.pureAsync(), basicModel.pureAsync()]);
  expect(fn).toHaveBeenCalledTimes(8);

  unsubscribe();
  fn.mockRestore();
});
