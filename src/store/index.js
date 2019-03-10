import { init } from '@rematch/core'
import createPersistPlugin from '@rematch/persist'

import auth from './modules/auth'

const persist = createPersistPlugin({
  whitelist: ['auth'],
  version: 1,
})

const store = init({
  models: { auth },
  plugins: [persist],
})

export default store
