"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

require("babel-core/register");

require("babel-polyfill");

var axios = require('axios');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();
var port = 3000;
var jsonParser = bodyParser.json();
console.log('api key ->', process.env.GOOGLE_MAPS_API);
var apiKey = process.env.GOOGLE_MAPS_API;

function getLatLng() {
  return _getLatLng.apply(this, arguments);
}

function _getLatLng() {
  _getLatLng = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var address,
        response,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            address = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
            _context2.prev = 1;
            _context2.next = 4;
            return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(address, "&key=").concat(apiKey));

          case 4:
            response = _context2.sent;

            if (!(response.data.status != 'OK')) {
              _context2.next = 8;
              break;
            }

            console.log(response.data);
            return _context2.abrupt("return", {
              lat: '-',
              lng: '-',
              status: response.data.status
            });

          case 8:
            console.log('result -> ', response.data.results[0].geometry.location);
            return _context2.abrupt("return", _objectSpread({}, response.data.results[0].geometry.location, {
              status: 'OK'
            }));

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log('ERROR ->', _context2.t0.response.data.error_message);
            return _context2.abrupt("return", {
              lat: '-',
              lng: '-',
              status: 'Error'
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return _getLatLng.apply(this, arguments);
}

app.post('/latlng', jsonParser,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var addressTofind, formatedAddressTofind, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            addressTofind = req.body.address;
            formatedAddressTofind = addressTofind.split(' ').join('+');
            _context.next = 4;
            return getLatLng(formatedAddressTofind);

          case 4:
            result = _context.sent;
            console.log(result);
            res.json({
              latlng: [result.lat, result.lng],
              status: result.status
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(port, function () {
  return console.log("Example app listening on port ".concat(port, "!"));
});