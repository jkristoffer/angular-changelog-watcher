import test from 'ava';

import checker from './index.js';

test.cb('runs without error', t => {
   checker( rs => {
      console.log('did change:', rs);
      t.end();
   })
});
