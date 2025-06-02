import { getLocalStorage, setLocalStorage, removeLocalStorage } from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('setLocalStorage и getLocalStorage работают корректно', () => {
    setLocalStorage('testKey', { a: 1 });
    expect(getLocalStorage('testKey', null)).toEqual({ a: 1 });
  });

  test('getLocalStorage возвращает defaultValue, если ключа нет', () => {
    expect(getLocalStorage('noKey', 'default')).toBe('default');
  });

  test('removeLocalStorage удаляет значение', () => {
    setLocalStorage('toRemove', 123);
    removeLocalStorage('toRemove');
    expect(getLocalStorage('toRemove', 'empty')).toBe('empty');
  });

  test('getLocalStorage возвращает defaultValue при невалидном JSON', () => {
    localStorage.setItem('broken', '{not valid json');
    expect(getLocalStorage('broken', 'fallback')).toBe('fallback');
  });

  test('setLocalStorage не падает при ошибке сериализации', () => {
    const circular = {};
    circular.self = circular;
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    setLocalStorage('circular', circular);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test('removeLocalStorage не падает при ошибке', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Симулируем ошибку через Object.freeze
    Object.defineProperty(window.localStorage, 'removeItem', {
      value: () => { throw new Error('fail'); },
      configurable: true
    });
    removeLocalStorage('failKey');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
}); 