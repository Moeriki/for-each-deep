// vendor modules

import { expect } from 'chai'

// modules

import forEachDeep from './index'

// tests

describe('forEachDeep', () => {

  // Object with 14 nested keys (9 primitives && 5 objects/arrays)
  const OBJ = {
    k1: 'v1',
    k2: 'v2',
    n1: {
      k3: 'v3',
      k4: 'v4',
      n2: [
        {
          k567: [
            'v5',
            'v6',
            'v7',
          ],
        },
      ],
      n3: {
        k8: 'v8',
        k9: 'v9',
      },
    },
  };

  it('should go over all values', () => {
    // setup
    var count = 0;

    // test
    forEachDeep(OBJ, () => void count++);

    // verify
    expect(count).to.equal(14);
  });

  it('should stop nesting when return false', () => {
    // setup
    var count = 0;

    // test
    forEachDeep(OBJ, () => {
      count++;
      return false;
    });

    // verify
    expect(count).to.equal(3);
  });

  it('should construct correct paths for nested objects and arrays', () => {
    // test
    const paths = [];
    forEachDeep(OBJ, (val, key, obj, path) => paths.push(path));

    // verify
    expect(paths).to.deep.equal([
      'k1',
      'k2',
      'n1',
      'n1.k3',
      'n1.k4',
      'n1.n2',
      'n1.n2[0]',
      'n1.n2[0].k567',
      'n1.n2[0].k567[0]',
      'n1.n2[0].k567[1]',
      'n1.n2[0].k567[2]',
      'n1.n3',
      'n1.n3.k8',
      'n1.n3.k9',
    ]);

  });

});
