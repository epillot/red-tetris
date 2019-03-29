'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var animationMiddleWare = exports.animationMiddleWare = function animationMiddleWare(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {

      if (!action.isAnimation) return next(action);

      if (document.hidden) return Promise.resolve();

      var nextAction = function nextAction(cb) {
        return cb ? cb(getState) : action.actions.shift();
      };

      return new Promise(function (resolve) {
        var stopped = false;

        var stop = function stop() {
          console.log('---------stop fired---------');
          if (document.hidden) {
            stopped = true;
            resolve();
          }
        };

        addEventListener('visibilitychange', stop);

        var loop = function loop() {
          var animAction = nextAction(action.nextAction);
          //console.log('la', animAction);
          if (animAction && !stopped) {
            dispatch(animAction);
            requestAnimationFrame(loop);
          } else {
            resolve();
            removeEventListener('visibilitychange', stop);
          }
        };

        requestAnimationFrame(loop);
      });
    };
  };
};