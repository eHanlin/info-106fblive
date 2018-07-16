require.config({
  shim: {

  },
  paths: {
    fblive: ['./106fblive'],

    /* third party */
    jquery: ['./lib/jquery-3.3.1.min'],
    lodash: ['./lib/lodash'],
    jqueryBlockUI: ['../lib/block-ui/jquery.blockUI']

  },
  map: {
    '*': {
      'jQuery': 'jquery'
    }
  }
})

require(['jquery'], () => {
  /* 一開始沒有return function的 js 必須在這裡require */
  require(['fblive'])
})
