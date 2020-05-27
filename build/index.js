"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createReducer = function createReducer(_ref) {
  var initialState = _ref.initialState,
      actions = _ref.actions,
      options = _ref.options;

  var _ref2 = options || {},
      _ref2$mode = _ref2.mode,
      mode = _ref2$mode === void 0 ? 'replaceState' : _ref2$mode;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var identifiedAction = actions[action.type];

    if (identifiedAction) {
      var stateTransformation = typeof identifiedAction === 'function' && identifiedAction || identifiedAction.setState || identifiedAction.replaceState;
      var mergeState = identifiedAction.setState || mode === 'setState' && !identifiedAction.replaceState;
      return mergeState ? _objectSpread({}, state, stateTransformation({
        state: state,
        action: action
      })) : stateTransformation({
        state: state,
        action: action
      });
    }

    return state;
  };
};

var _default = createReducer;
exports.default = _default;