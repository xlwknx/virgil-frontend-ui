(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(17)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone)
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset()
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"Container":"_3znimJM5nk8z92C0NV4Mxs","Month":"DTxr85JkFUUPmTOyXDQQy","Week":"_1qQbo7D3DmP3fGo6OS6GT3","Day":"_3A-dUcLiW7PhHoeM1DQdHL _1wAw8i4196WovOa4dFOUx9","Default":"X7n0zh8JKa6FXuPEacrbL","Selected":"_4L_tLUQ4039MQc_qzygiB","Inactive":"a7iR9dMShT1WUQjlInzd-","Weekday":"_3FYh5-z9hfcgZ-Q7mYZcOy","MonthsSelector":"_3Y5VAA3Qu8vTjtgyhzsiDX","MonthsText":"_2_kyG1ZCeNVovYhuPVvlXB _7twpvpfGOm-2MpyN_d85L","PeriodContainer":"cx5Z7GMdV327B7QA_3u6B","Row":"_2eTksMe52PlxlM7-OYCAhS","ListItem":"_25w4Ew-vRH4tpNoUnZMsJU _1wAw8i4196WovOa4dFOUx9","ListMonth":"rMaMDoCpU0kQ2QAU-mkC2 _25w4Ew-vRH4tpNoUnZMsJU _1wAw8i4196WovOa4dFOUx9","ListYear":"_3udKysxvZnNIL6l-3-BY3T _25w4Ew-vRH4tpNoUnZMsJU _1wAw8i4196WovOa4dFOUx9"};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var getDayOfYear = __webpack_require__(44)
var getISOWeek = __webpack_require__(46)
var getISOYear = __webpack_require__(21)
var parse = __webpack_require__(0)
var isValid = __webpack_require__(48)
var enLocale = __webpack_require__(49)

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  var options = dirtyOptions || {}

  var locale = options.locale
  var localeFormatters = enLocale.format.formatters
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp
    }
  }

  var date = parse(dirtyDate)

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp)

  return formatFn(date)
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2)
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getDay()
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getISOWeek(date)
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getISOYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getISOYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getHours()
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date) {
    return date.getTime()
  }
}

function buildFormatFn (formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp)
  var length = array.length

  var i
  var formatter
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]]
    if (formatter) {
      array[i] = formatter
    } else {
      array[i] = removeFormattingTokens(array[i])
    }
  }

  return function (date) {
    var output = ''
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters)
      } else {
        output += array[i]
      }
    }
    return output
  }
}

function removeFormattingTokens (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || ''
  var sign = offset > 0 ? '-' : '+'
  var absOffset = Math.abs(offset)
  var hours = Math.floor(absOffset / 60)
  var minutes = absOffset % 60
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString()
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

module.exports = format


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var ButtonContent_1 = __importDefault(__webpack_require__(12));
var styles = __webpack_require__(6);
var ButtonTheme;
(function (ButtonTheme) {
    ButtonTheme[ButtonTheme["Primary"] = styles.Primary] = "Primary";
    ButtonTheme[ButtonTheme["Secondary"] = styles.Secondary] = "Secondary";
    ButtonTheme[ButtonTheme["Inline"] = styles.Inline] = "Inline";
    ButtonTheme[ButtonTheme["Outline"] = styles.Outline] = "Outline";
    ButtonTheme[ButtonTheme["SmallOutlineRed"] = styles.SmallOutlineRed] = "SmallOutlineRed";
    ButtonTheme[ButtonTheme["SmallOutlineWhite"] = styles.SmallOutlineWhite] = "SmallOutlineWhite";
})(ButtonTheme = exports.ButtonTheme || (exports.ButtonTheme = {}));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a = this.props, className = _a.className, icon = _a.icon, children = _a.children, _b = _a.theme, theme = _b === void 0 ? ButtonTheme.Primary : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, loading = _a.loading, props = __rest(_a, ["className", "icon", "children", "theme", "disabled", "loading"]);
        var wrapperClass = classnames_1.default(className, theme);
        return (react_1.default.createElement("button", __assign({}, props, { disabled: disabled, className: wrapperClass }),
            react_1.default.createElement(ButtonContent_1.default, { icon: icon, loading: loading }, children)));
    };
    Button.ButtonTheme = ButtonTheme;
    return Button;
}(react_1.default.Component));
exports.default = Button;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"Button":"_3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ","Icon":"_2JlBonq3I8TGAIaws88xhp","Spinner":"_2fUuejCosAiRxs7MsuljJd","Primary":"_2Udrc-Agj1KIyFEVN2Pdm6 _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ","Secondary":"oNi6u1uRijFBp0-SHowQH _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ","Inline":"_1g8VQcOcNI1THYW8d7mN01 _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ","Outline":"tmTOaoXKwYQMEBocGm8QF _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ","SmallOutline":"s5kxjk6jy8GOCvttoGSCA _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ _1ALMGGVmxRR9s0Rw9lNEag","SmallOutlineRed":"qQWnX3tDqRODJf5M2vmTF s5kxjk6jy8GOCvttoGSCA _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ _1ALMGGVmxRR9s0Rw9lNEag","SmallOutlineWhite":"_2yKvOft25kLXA7GTYJEBu3 s5kxjk6jy8GOCvttoGSCA _3ynUxYXoC99GfOJ5tewukF _36z9FiPKCQt_6vYfSRUAaJ _1ALMGGVmxRR9s0Rw9lNEag"};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfDay


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var startOfWeek = __webpack_require__(19)

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek (dirtyDate) {
  return startOfWeek(dirtyDate, {weekStartsOn: 1})
}

module.exports = startOfISOWeek


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() > dateToCompare.getTime()
}

module.exports = isAfter


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() < dateToCompare.getTime()
}

module.exports = isBefore


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var ArrowUp_1 = __importDefault(__webpack_require__(24));
var styles = __webpack_require__(25);
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
})(Direction = exports.Direction || (exports.Direction = {}));
var ArrowIcon = /** @class */ (function (_super) {
    __extends(ArrowIcon, _super);
    function ArrowIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrowIcon.prototype.render = function () {
        var _a = this.props, direction = _a.direction, className = _a.className, props = __rest(_a, ["direction", "className"]);
        var iconStyle = classnames_1.default(styles.Default, direction, className);
        return react_1.default.createElement(ArrowUp_1.default, __assign({}, props, { className: iconStyle }));
    };
    ArrowIcon.Direction = Direction;
    return ArrowIcon;
}(react_1.default.Component));
exports.default = ArrowIcon;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var Spinner_1 = __importDefault(__webpack_require__(33));
var styles = __webpack_require__(6);
var ButtonContent = /** @class */ (function (_super) {
    __extends(ButtonContent, _super);
    function ButtonContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonContent.prototype.render = function () {
        var _a = this.props, children = _a.children, icon = _a.icon, loading = _a.loading;
        var iconProps, iconClass;
        if (icon) {
            iconProps = icon.props;
            iconClass = classnames_1.default(styles.Icon, icon.props.className);
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            children,
            icon != null && react_1.default.cloneElement(icon, __assign({}, iconProps, { className: iconClass })),
            loading && react_1.default.createElement(Spinner_1.default, { className: styles.Spinner })));
    };
    return ButtonContent;
}(react_1.default.Component));
exports.default = ButtonContent;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var Month_1 = __importDefault(__webpack_require__(41));
var PeriodSelector_1 = __importDefault(__webpack_require__(57));
var MonthList_1 = __importDefault(__webpack_require__(61));
var YearList_1 = __importDefault(__webpack_require__(63));
var start_of_month_1 = __importDefault(__webpack_require__(16));
var end_of_month_1 = __importDefault(__webpack_require__(66));
var styles = __webpack_require__(3);
var SelectType;
(function (SelectType) {
    SelectType[SelectType["Day"] = 0] = "Day";
    SelectType[SelectType["Week"] = 1] = "Week";
    SelectType[SelectType["Month"] = 2] = "Month";
    SelectType[SelectType["Year"] = 3] = "Year";
})(SelectType = exports.SelectType || (exports.SelectType = {}));
var SelectView;
(function (SelectView) {
    SelectView[SelectView["Day"] = 0] = "Day";
    SelectView[SelectView["Month"] = 1] = "Month";
    SelectView[SelectView["Year"] = 2] = "Year";
})(SelectView = exports.SelectView || (exports.SelectView = {}));
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            date: _this.props.date || new Date(),
            view: _this.props.selectView,
        };
        _this.renderMonth = function () { return (react_1.default.createElement(Month_1.default, { onDateSelect: _this.props.onDateSelect, viewDate: _this.state.date, date: _this.props.date, maxDate: _this.props.maxDate, minDate: _this.props.minDate })); };
        _this.renderMonthList = function () { return (react_1.default.createElement(MonthList_1.default, { viewDate: _this.state.date, date: _this.props.date, maxDate: _this.props.maxDate && end_of_month_1.default(_this.props.maxDate), minDate: _this.props.minDate && start_of_month_1.default(_this.props.minDate), onDateSelect: _this.selectMonthList })); };
        _this.renderYearList = function () { return (react_1.default.createElement(YearList_1.default, { viewDate: _this.state.date, date: _this.props.date, onDateSelect: _this.selectYearList, minDate: _this.props.minDate, maxDate: _this.props.maxDate })); };
        _this.handleChangePeriod = function (date) { return _this.setState({ date: date }); };
        _this.selectDay = function () { return _this.setState({ view: SelectView.Day }); };
        _this.selectMonth = function () { return _this.setState({ view: SelectView.Month }); };
        _this.selectYear = function () { return _this.setState({ view: SelectView.Year }); };
        _this.selectMonthList = function (date) {
            var _a = _this.props, onDateSelect = _a.onDateSelect, selectView = _a.selectView;
            if (selectView !== SelectView.Month) {
                _this.setState({
                    view: SelectView.Day,
                    date: date,
                });
            }
            else if (onDateSelect) {
                onDateSelect(date);
            }
        };
        _this.selectYearList = function (date) {
            var _a = _this.props, onDateSelect = _a.onDateSelect, selectView = _a.selectView;
            if (selectView !== SelectView.Year) {
                _this.setState({
                    view: SelectView.Month,
                    date: date,
                });
            }
            else if (onDateSelect) {
                onDateSelect(date);
            }
        };
        _this.selectPeriod = function () {
            switch (_this.state.view) {
                case SelectView.Year:
                    _this.selectDay();
                    break;
                case SelectView.Month:
                    _this.selectYear();
                    break;
                case SelectView.Day:
                default:
                    _this.selectMonth();
            }
        };
        return _this;
    }
    Calendar.prototype.componentWillReceiveProps = function (props) {
        if (props.date) {
            this.setState({ date: props.date });
        }
    };
    Calendar.prototype.render = function () {
        var date = this.state.date;
        var calendarContent;
        if (this.state.view === SelectView.Year) {
            calendarContent = this.renderYearList();
        }
        else if (this.state.view === SelectView.Month) {
            calendarContent = this.renderMonthList();
        }
        else {
            calendarContent = this.renderMonth();
        }
        return (react_1.default.createElement("div", { className: [this.props.className, styles.Container].join(' ') },
            react_1.default.createElement(PeriodSelector_1.default, { selectView: this.state.view, onChangePeriod: this.handleChangePeriod, onClick: this.selectPeriod, date: date }),
            calendarContent));
    };
    Calendar.defaultProps = {
        date: new Date(),
        selectView: SelectView.Day,
    };
    return Calendar;
}(react_1.default.Component));
exports.default = Calendar;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfMonth


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? (Number(dirtyOptions.weekStartsOn) || 0) : 0

  var date = parse(dirtyDate)
  var day = date.getDay()
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

  date.setDate(date.getDate() - diff)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfWeek


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear (dirtyDate) {
  var cleanDate = parse(dirtyDate)
  var date = new Date(0)
  date.setFullYear(cleanDate.getFullYear(), 0, 1)
  date.setHours(0, 0, 0, 0)
  return date
}

module.exports = startOfYear


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfISOWeek = __webpack_require__(8)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()

  var fourthOfJanuaryOfNextYear = new Date(0)
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4)
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0)
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear)

  var fourthOfJanuaryOfThisYear = new Date(0)
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4)
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0)
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

module.exports = getISOYear


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var getDaysInMonth = __webpack_require__(60)

/**
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @returns {Date} the new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  var desiredMonth = date.getMonth() + amount
  var dateWithDesiredMonth = new Date(0)
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1)
  dateWithDesiredMonth.setHours(0, 0, 0, 0)
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth)
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
  return date
}

module.exports = addMonths


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(27));
__export(__webpack_require__(32));
__export(__webpack_require__(36));
__export(__webpack_require__(40));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var ArrowUp = function (props) { return (react_1.default.createElement("svg", __assign({ viewBox: "0 0 10 6", width: "1em", height: "1em" }, props),
    react_1.default.createElement("path", { d: "M10 4.9L8.941 6 5.023 2.206 1.054 6.012 0 4.9 5.028-.02z" }))); };
exports.default = ArrowUp;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"Default":"_1BDWGOWdbRy9XHlS5C5F1_","Up":"_2p1ngdl7XqFJmn31S_qDK-","Right":"_1A5ZMmKmWS4xFjY6d6sOf7","Down":"_2X5vWN1FgVSYId-uXwFIu8","Left":"_323xVHE2nVkrL2UyP-H02a"};

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(28));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var styles = __webpack_require__(29);
var createBadge = function (badgeStyle) { return function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(styles.Badge, badgeStyle, className) }, props)));
}; };
exports.GreyBadge = createBadge(styles.GreyBadge);
exports.BlueBadge = createBadge(styles.BlueBadge);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"muller-40":"_3SWxW_vEJlvJ5O5F7l45qp","muller40":"_3SWxW_vEJlvJ5O5F7l45qp","muller":"_2mwot2VYo2OVmWUNF9MqAK","muller-28-reg":"_2knukSCmN6Dnn8fSaq65fA","muller28Reg":"_2knukSCmN6Dnn8fSaq65fA","muller-28":"_26XcgIq8mG_D14gZob77va","muller28":"_26XcgIq8mG_D14gZob77va","muller-20":"_3pPxUORmRNuZ3NEyM9H9A3","muller20":"_3pPxUORmRNuZ3NEyM9H9A3","muller-18":"_1i9gGncTLZ07yajqi0Juc2","muller18":"_1i9gGncTLZ07yajqi0Juc2","muller-17":"j-zfjbMP5n-kFXF_P2wDT","muller17":"j-zfjbMP5n-kFXF_P2wDT","muller-16":"_1AcMR2Sb-gT5lasPC4KnQT","muller16":"_1AcMR2Sb-gT5lasPC4KnQT","muller-14":"_3BVGotH04J-d7elTfCdE_D","muller14":"_3BVGotH04J-d7elTfCdE_D","muller-14-thin":"_2c6QnYMKwdobdyXF5pXBAG","muller14Thin":"_2c6QnYMKwdobdyXF5pXBAG","muller-11":"vkoSzriBkRumyeC4Fddwk","muller11":"vkoSzriBkRumyeC4Fddwk","muller-11-thin":"iQm65g00fTMCrbkOLCvNW","muller11Thin":"iQm65g00fTMCrbkOLCvNW","lato-16":"BbIUZXiHqk1aI5ftKkcpN","lato16":"BbIUZXiHqk1aI5ftKkcpN","lato-14":"_3D-Vx4PUFNSEvj3Vpek0AA","lato14":"_3D-Vx4PUFNSEvj3Vpek0AA","lato-13":"_2Vstz0NkmzETuXcw01HoR8","lato13":"_2Vstz0NkmzETuXcw01HoR8","lato-12":"_1Iii0JjMtSa9JSpUQZNeRe","lato12":"_1Iii0JjMtSa9JSpUQZNeRe","OpaqueGray":"_114uYQLr5xtZ65TEu4zwhU vkoSzriBkRumyeC4Fddwk","Badge":"l4guoMsRsWR9vDHiioYHz vkoSzriBkRumyeC4Fddwk","GreyBadge":"_3NerLxBeYvc8WNgFBZyuKG","BlueBadge":"_3DUrP0Fw0eXyQw5Rw_XvfQ"};

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
var Button_1 = __webpack_require__(5);
exports.Button = Button_1.default;
var ButtonLink_1 = __webpack_require__(35);
exports.ButtonLink = ButtonLink_1.default;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var Spinner = function (props) { return (react_1.default.createElement("svg", __assign({ viewBox: "0 0 38 38", stroke: "#fff", width: "1em", height: "1em" }, props),
    react_1.default.createElement("g", { transform: "translate(1 1)", strokeWidth: 2, fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("circle", { strokeOpacity: 0.5, cx: 18, cy: 18, r: 18 }),
        react_1.default.createElement("path", { d: "M36 18c0-9.94-8.06-18-18-18" },
            react_1.default.createElement("animateTransform", { attributeName: "transform", type: "rotate", from: "0 18 18", to: "360 18 18", dur: "1s", repeatCount: "indefinite" }))))); };
exports.default = Spinner;


/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var ButtonContent_1 = __importDefault(__webpack_require__(12));
var Button_1 = __webpack_require__(5);
var styles = __webpack_require__(6);
var ButtonLink = /** @class */ (function (_super) {
    __extends(ButtonLink, _super);
    function ButtonLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonLink.prototype.render = function () {
        var _a = this.props, className = _a.className, icon = _a.icon, children = _a.children, _b = _a.theme, theme = _b === void 0 ? Button_1.ButtonTheme.Primary : _b, loading = _a.loading, props = __rest(_a, ["className", "icon", "children", "theme", "loading"]);
        var wrapperClass = classnames_1.default(styles.Link, className, theme);
        return (react_1.default.createElement("a", __assign({}, props, { className: wrapperClass }),
            react_1.default.createElement(ButtonContent_1.default, { icon: icon, loading: loading }, children)));
    };
    ButtonLink.ButtonTheme = Button_1.ButtonTheme;
    return ButtonLink;
}(react_1.default.Component));
exports.default = ButtonLink;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(37));


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var styles = __webpack_require__(38);
var createPanel = function (panelStyle) { return function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(styles.Panel, panelStyle, className) }, props)));
}; };
exports.DarkPanel = createPanel(styles.PanelDark);
exports.LightPanel = createPanel(styles.PanelLight);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"Panel":"_3Xa6u3gpYqZ3IVjebivSlb","PanelDark":"_3XPTZyoOZQc65YjGdjVRkR","PanelLight":"_27vXOSC0gnJji_Uv0Xlorc"};

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Calendar_1 = __webpack_require__(15);
exports.Calendar = Calendar_1.default;
exports.SelectView = Calendar_1.SelectView;
exports.SelectType = Calendar_1.SelectType;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var start_of_month_1 = __importDefault(__webpack_require__(16));
var add_weeks_1 = __importDefault(__webpack_require__(42));
var start_of_week_1 = __importDefault(__webpack_require__(19));
var add_days_1 = __importDefault(__webpack_require__(18));
var is_same_day_1 = __importDefault(__webpack_require__(43));
var format_1 = __importDefault(__webpack_require__(4));
var is_after_1 = __importDefault(__webpack_require__(9));
var is_before_1 = __importDefault(__webpack_require__(10));
var start_of_day_1 = __importDefault(__webpack_require__(7));
var end_of_day_1 = __importDefault(__webpack_require__(53));
var Day_1 = __importDefault(__webpack_require__(54));
var Week_1 = __importDefault(__webpack_require__(56));
var styles = __webpack_require__(3);
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderWeek = function (week) {
            return react_1.default.createElement(Week_1.default, { key: week.getTime() }, _this.daysOfWeek(week).map(_this.renderDay));
        };
        _this.renderDay = function (day) {
            day = new Date(Date.UTC(day.getFullYear(), day.getMonth(), day.getDate()));
            return (react_1.default.createElement(Day_1.default, { key: day.getTime(), date: day, onDateSelect: _this.props.onDateSelect, theme: _this.getDayTheme(day), action: is_same_day_1.default(_this.props.date, day) ? Day_1.default.DayAction.Selected : Day_1.default.DayAction.None, disabled: _this.getDayTheme(day) === Day_1.default.DayTheme.Inactive ? true : false }, format_1.default(day, 'D')));
        };
        _this.renderWeekDayNames = function (day) {
            return (react_1.default.createElement(Day_1.default, { key: day.getTime(), date: day, theme: Day_1.default.DayTheme.Weekday, disabled: true }, format_1.default(day, 'dd')));
        };
        return _this;
    }
    Month.prototype.weeksOfMonth = function () {
        var weeks = [];
        for (var weekCount = 0; weekCount < 6; weekCount++) {
            var nextWeekDate = add_weeks_1.default(start_of_month_1.default(this.props.viewDate), weekCount);
            weeks.push(nextWeekDate);
        }
        return weeks;
    };
    Month.prototype.daysOfWeek = function (week) {
        var days = [];
        for (var dayCount = 0; dayCount < 7; dayCount++) {
            var nextDay = add_days_1.default(start_of_week_1.default(week, { weekStartsOn: 1 }), dayCount);
            days.push(nextDay);
        }
        return days;
    };
    Month.prototype.getDayTheme = function (day) {
        var _a = this.props, maxDate = _a.maxDate, minDate = _a.minDate;
        if (maxDate && is_after_1.default(day, end_of_day_1.default(maxDate))) {
            return Day_1.default.DayTheme.Inactive;
        }
        if (minDate && is_before_1.default(day, start_of_day_1.default(minDate))) {
            return Day_1.default.DayTheme.Inactive;
        }
        return Day_1.default.DayTheme.Default;
    };
    Month.prototype.render = function () {
        var weeks = this.weeksOfMonth();
        return (react_1.default.createElement("div", { className: styles.Month },
            react_1.default.createElement(Week_1.default, null, this.daysOfWeek(weeks[1]).map(this.renderWeekDayNames)),
            weeks.map(this.renderWeek)));
    };
    return Month;
}(react_1.default.PureComponent));
exports.default = Month;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(18)

/**
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  var days = amount * 7
  return addDays(dirtyDate, days)
}

module.exports = addWeeks


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(7)

/**
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay (dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft)
  var dateRightStartOfDay = startOfDay(dirtyDateRight)

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
}

module.exports = isSameDay


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfYear = __webpack_require__(20)
var differenceInCalendarDays = __webpack_require__(45)

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = differenceInCalendarDays(date, startOfYear(date))
  var dayOfYear = diff + 1
  return dayOfYear
}

module.exports = getDayOfYear


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var startOfDay = __webpack_require__(7)

var MILLISECONDS_IN_MINUTE = 60000
var MILLISECONDS_IN_DAY = 86400000

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays (dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft)
  var startOfDayRight = startOfDay(dirtyDateRight)

  var timestampLeft = startOfDayLeft.getTime() -
    startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE
  var timestampRight = startOfDayRight.getTime() -
    startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY)
}

module.exports = differenceInCalendarDays


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)
var startOfISOWeek = __webpack_require__(8)
var startOfISOYear = __webpack_require__(47)

var MILLISECONDS_IN_WEEK = 604800000

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek (dirtyDate) {
  var date = parse(dirtyDate)
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}

module.exports = getISOWeek


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var getISOYear = __webpack_require__(21)
var startOfISOWeek = __webpack_require__(8)

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear (dirtyDate) {
  var year = getISOYear(dirtyDate)
  var fourthOfJanuary = new Date(0)
  fourthOfJanuary.setFullYear(year, 0, 4)
  fourthOfJanuary.setHours(0, 0, 0, 0)
  var date = startOfISOWeek(fourthOfJanuary)
  return date
}

module.exports = startOfISOYear


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(17)

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate)
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date')
  }
}

module.exports = isValid


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var buildDistanceInWordsLocale = __webpack_require__(50)
var buildFormatLocale = __webpack_require__(51)

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
}


/***/ }),
/* 50 */
/***/ (function(module, exports) {

function buildDistanceInWordsLocale () {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  }

  function localize (token, count, options) {
    options = options || {}

    var result
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token]
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count)
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }

  return {
    localize: localize
  }
}

module.exports = buildDistanceInWordsLocale


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var buildFormattingTokensRegExp = __webpack_require__(52)

function buildFormatLocale () {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var meridiemUppercase = ['AM', 'PM']
  var meridiemLowercase = ['am', 'pm']
  var meridiemFull = ['a.m.', 'p.m.']

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return months3char[date.getMonth()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return monthsFull[date.getMonth()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return weekdays2char[date.getDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return weekdays3char[date.getDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return weekdaysFull[date.getDay()]
    },

    // AM, PM
    'A': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemUppercase[1] : meridiemUppercase[0]
    },

    // am, pm
    'a': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemLowercase[1] : meridiemLowercase[0]
    },

    // a.m., p.m.
    'aa': function (date) {
      return (date.getHours() / 12) >= 1 ? meridiemFull[1] : meridiemFull[0]
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  }
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

module.exports = buildFormatLocale


/***/ }),
/* 52 */
/***/ (function(module, exports) {

var commonFormatterKeys = [
  'M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd',
  'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG',
  'H', 'HH', 'h', 'hh', 'm', 'mm',
  's', 'ss', 'S', 'SS', 'SSS',
  'Z', 'ZZ', 'X', 'x'
]

function buildFormattingTokensRegExp (formatters) {
  var formatterKeys = []
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key)
    }
  }

  var formattingTokens = commonFormatterKeys
    .concat(formatterKeys)
    .sort()
    .reverse()
  var formattingTokensRegExp = new RegExp(
    '(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g'
  )

  return formattingTokensRegExp
}

module.exports = buildFormattingTokensRegExp


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay (dirtyDate) {
  var date = parse(dirtyDate)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfDay


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var styles = __webpack_require__(3);
var DayTheme;
(function (DayTheme) {
    DayTheme[DayTheme["Default"] = styles.Default] = "Default";
    DayTheme[DayTheme["Weekday"] = styles.Weekday] = "Weekday";
    DayTheme[DayTheme["Inactive"] = styles.Inactive] = "Inactive";
})(DayTheme = exports.DayTheme || (exports.DayTheme = {}));
var DayAction;
(function (DayAction) {
    DayAction[DayAction["None"] = 0] = "None";
    DayAction[DayAction["Selected"] = styles.Selected] = "Selected";
})(DayAction || (DayAction = {}));
var Day = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            if (_this.props.onDateSelect) {
                _this.props.onDateSelect(_this.props.date);
            }
        };
        return _this;
    }
    Day.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, _b = _a.theme, theme = _b === void 0 ? styles.Default : _b, _c = _a.action, action = _c === void 0 ? DayAction.None : _c, onDateSelect = _a.onDateSelect, props = __rest(_a, ["children", "className", "theme", "action", "onDateSelect"]);
        var dayClass = [styles.Day, className, theme, action].join(' ');
        return (react_1.default.createElement("button", __assign({ className: dayClass, onClick: this.handleClick }, props), children));
    };
    Day.DayTheme = DayTheme;
    Day.DayAction = DayAction;
    return Day;
}(react_1.default.PureComponent));
exports.default = Day;


/***/ }),
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var styles = __webpack_require__(3);
var Week = /** @class */ (function (_super) {
    __extends(Week, _super);
    function Week() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Week.prototype.render = function () {
        return react_1.default.createElement("div", { className: styles.Week }, this.props.children);
    };
    return Week;
}(react_1.default.PureComponent));
exports.default = Week;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var ArrowIcon_1 = __webpack_require__(58);
var format_1 = __importDefault(__webpack_require__(4));
var add_years_1 = __importDefault(__webpack_require__(59));
var add_months_1 = __importDefault(__webpack_require__(22));
var Calendar_1 = __webpack_require__(15);
var styles = __webpack_require__(3);
var PeriodSelector = /** @class */ (function (_super) {
    __extends(PeriodSelector, _super);
    function PeriodSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleIncrease = function () { return _this.props.onChangePeriod(_this.changeDateByPeriod(1)); };
        _this.handleDecrease = function () { return _this.props.onChangePeriod(_this.changeDateByPeriod(-1)); };
        _this.renderContent = function () {
            switch (_this.props.selectView) {
                case Calendar_1.SelectView.Year:
                    var year = Math.floor(_this.props.date.getFullYear() / 10);
                    return year * 10 + " - " + (year * 10 + 9);
                case Calendar_1.SelectView.Month:
                    return format_1.default(_this.props.date, 'YYYY');
                case Calendar_1.SelectView.Day:
                default:
                    return format_1.default(_this.props.date, 'MMMM, YYYY');
            }
        };
        _this.changeDateByPeriod = function (k) {
            var date;
            switch (_this.props.selectView) {
                case Calendar_1.SelectView.Year:
                    date = add_years_1.default(_this.props.date, 10 * k);
                    break;
                case Calendar_1.SelectView.Month:
                    date = add_years_1.default(_this.props.date, 1 * k);
                    break;
                case Calendar_1.SelectView.Day:
                default:
                    date = add_months_1.default(_this.props.date, 1 * k);
            }
            return date;
        };
        return _this;
    }
    PeriodSelector.prototype.render = function () {
        var onClick = this.props.onClick;
        return (react_1.default.createElement("div", { className: styles.MonthsSelector },
            react_1.default.createElement("button", { onClick: this.handleDecrease },
                react_1.default.createElement(ArrowIcon_1.ArrowIcon, { direction: ArrowIcon_1.ArrowIcon.Direction.Left })),
            react_1.default.createElement("button", { onClick: onClick, className: styles.MonthsText }, this.renderContent()),
            react_1.default.createElement("button", { onClick: this.handleIncrease },
                react_1.default.createElement(ArrowIcon_1.ArrowIcon, { direction: ArrowIcon_1.ArrowIcon.Direction.Right }))));
    };
    return PeriodSelector;
}(react_1.default.Component));
exports.default = PeriodSelector;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArrowIcon_1 = __webpack_require__(11);
exports.ArrowIcon = ArrowIcon_1.default;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var addMonths = __webpack_require__(22)

/**
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @returns {Date} the new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addMonths(dirtyDate, amount * 12)
}

module.exports = addYears


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  var monthIndex = date.getMonth()
  var lastDayOfMonth = new Date(0)
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0)
  lastDayOfMonth.setHours(0, 0, 0, 0)
  return lastDayOfMonth.getDate()
}

module.exports = getDaysInMonth


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var format_1 = __importDefault(__webpack_require__(4));
var is_after_1 = __importDefault(__webpack_require__(9));
var is_before_1 = __importDefault(__webpack_require__(10));
var is_same_month_1 = __importDefault(__webpack_require__(62));
var styles = __webpack_require__(3);
var MonthList = /** @class */ (function (_super) {
    __extends(MonthList, _super);
    function MonthList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderMonth = function (month) {
            var _a;
            var handleDateSelect = function () { return _this.props.onDateSelect && _this.props.onDateSelect(month); };
            var isSame = is_same_month_1.default(month, _this.props.date);
            var isBeforeMin = _this.props.minDate && is_before_1.default(month, _this.props.minDate);
            var isAfterMax = _this.props.maxDate && is_after_1.default(month, _this.props.maxDate);
            var monthClass = classnames_1.default((_a = {},
                _a[styles.ListMonth] = true,
                _a[styles.Selected] = isSame,
                _a[styles.Inactive] = isBeforeMin || isAfterMax,
                _a));
            return (react_1.default.createElement("button", { disabled: Boolean(isBeforeMin || isAfterMax), className: monthClass, onClick: handleDateSelect }, format_1.default(month, 'MMM')));
        };
        return _this;
    }
    MonthList.prototype.render = function () {
        var viewDate = this.props.viewDate;
        return (react_1.default.createElement("div", { className: styles.PeriodContainer },
            react_1.default.createElement("div", { className: styles.Row },
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 0))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 1))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 2)))),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 3))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 4))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 5)))),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 6))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 7))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 8)))),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 9))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 10))),
                this.renderMonth(new Date(Date.UTC(viewDate.getFullYear(), 11))))));
    };
    return MonthList;
}(react_1.default.Component));
exports.default = MonthList;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

module.exports = isSameMonth


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(1));
var classnames_1 = __importDefault(__webpack_require__(2));
var format_1 = __importDefault(__webpack_require__(4));
var is_after_1 = __importDefault(__webpack_require__(9));
var is_before_1 = __importDefault(__webpack_require__(10));
var is_same_year_1 = __importDefault(__webpack_require__(64));
var start_of_year_1 = __importDefault(__webpack_require__(20));
var end_of_year_1 = __importDefault(__webpack_require__(65));
var styles = __webpack_require__(3);
var YearList = /** @class */ (function (_super) {
    __extends(YearList, _super);
    function YearList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderYear = function (shift) {
            var _a;
            var viewDate = _this.props.viewDate;
            var startYear = Math.floor(viewDate.getFullYear() / 10) * 10;
            var year = new Date(Date.UTC(startYear + shift, 0));
            var handleDateSelect = function () { return _this.props.onDateSelect && _this.props.onDateSelect(year); };
            var isAfterMaxDate = _this.props.maxDate && is_after_1.default(year, end_of_year_1.default(_this.props.maxDate));
            var isBeforeMinDate = _this.props.minDate && is_before_1.default(year, start_of_year_1.default(_this.props.minDate));
            var yearClass = classnames_1.default((_a = {},
                _a[styles.ListYear] = true,
                _a[styles.Selected] = is_same_year_1.default(_this.props.date, year),
                _a[styles.Inactive] = isAfterMaxDate || isBeforeMinDate,
                _a));
            return (react_1.default.createElement("button", { disabled: Boolean(isAfterMaxDate || isBeforeMinDate), className: yearClass, onClick: handleDateSelect }, format_1.default(year, 'YYYY')));
        };
        return _this;
    }
    YearList.prototype.render = function () {
        return (react_1.default.createElement("div", { className: styles.PeriodContainer },
            react_1.default.createElement("div", { className: styles.Row },
                this.renderYear(-1),
                this.renderYear(0),
                this.renderYear(1)),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderYear(2),
                this.renderYear(3),
                this.renderYear(4)),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderYear(5),
                this.renderYear(6),
                this.renderYear(7)),
            react_1.default.createElement("div", { className: styles.Row },
                this.renderYear(8),
                this.renderYear(9),
                this.renderYear(10))));
    };
    return YearList;
}(react_1.default.Component));
exports.default = YearList;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear()
}

module.exports = isSameYear


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear (dirtyDate) {
  var date = parse(dirtyDate)
  var year = date.getFullYear()
  date.setFullYear(year + 1, 0, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfYear


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(0)

/**
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth (dirtyDate) {
  var date = parse(dirtyDate)
  var month = date.getMonth()
  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(23, 59, 59, 999)
  return date
}

module.exports = endOfMonth


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map