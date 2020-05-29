/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Home = __webpack_require__(9);

var _Home2 = _interopRequireDefault(_Home);

var _GridComp = __webpack_require__(10);

var _GridComp2 = _interopRequireDefault(_GridComp);

var _api = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    path: '/',
    exact: true,
    component: _Home2.default
}, {
    path: '/popular/:id',
    component: _GridComp2.default,
    fetchInitialData: function fetchInitialData() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return (0, _api.fetchPopularRepos)(path.split('/').pop());
    }
}];

exports.default = routes;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(6);

var _cors2 = _interopRequireDefault(_cors);

var _server = __webpack_require__(7);

var _App = __webpack_require__(8);

var _App2 = _interopRequireDefault(_App);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _serializeJavascript = __webpack_require__(35);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _styles = __webpack_require__(36);

var _reactRouterDom = __webpack_require__(1);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var sheets = new _styles.ServerStyleSheets();
app.use((0, _cors2.default)());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(_express2.default.static("public"));
app.get("*", function (req, res, next) {
  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};
  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var context = { data: data };
    var markup = (0, _server.renderToString)(sheets.collect(_react2.default.createElement(
      _styles.ThemeProvider,
      null,
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: req.url, context: context },
        _react2.default.createElement(_App2.default, null)
      )
    )));
    var css = sheets.toString();
    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>SSR with RR</title>\n          <style id=\"jss-server-side\">" + css + "</style>\n          <script src=\"/bundle.js\" defer></script>\n          <script>window.__INITIAL_DATA__=" + (0, _serializeJavascript2.default)(data) + "</script>\n        </head>\n  \n        <body>\n          <div id=\"app\"> " + markup + "</div>\n        </body>\n      </html>\n    ");
  }).catch(next);
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log("Server is listening on port: " + app.get('port'));
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(2);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(1);

var _NoMatch = __webpack_require__(30);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

var _Navbar = __webpack_require__(31);

var _Navbar2 = _interopRequireDefault(_Navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navbar2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                C = _ref.component,
                rest = _objectWithoutProperties(_ref, ['path', 'exact', 'component']);

            return _react2.default.createElement(_reactRouterDom.Route, {
              key: path,
              path: path,
              exact: exact,
              render: function render(props) {
                return _react2.default.createElement(C, _extends({}, props, rest));
              }
            });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(_NoMatch2.default, props);
            } })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Home;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home() {
    return _react2.default.createElement(
        'div',
        { sytle: { margin: 300 } },
        'Material UI + REACT + SERVER Side Rendering'
    );
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GridComp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CardHeader = __webpack_require__(11);

var _CardHeader2 = _interopRequireDefault(_CardHeader);

var _Card = __webpack_require__(12);

var _Card2 = _interopRequireDefault(_Card);

var _Grid = __webpack_require__(13);

var _Grid2 = _interopRequireDefault(_Grid);

var _Avatar = __webpack_require__(14);

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Info = __webpack_require__(15);

var _Info2 = _interopRequireDefault(_Info);

var _IconButton = __webpack_require__(16);

var _IconButton2 = _interopRequireDefault(_IconButton);

var _CardContent = __webpack_require__(17);

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Star = __webpack_require__(18);

var _Star2 = _interopRequireDefault(_Star);

var _Typography = __webpack_require__(19);

var _Typography2 = _interopRequireDefault(_Typography);

var _Home = __webpack_require__(20);

var _Home2 = _interopRequireDefault(_Home);

var _CardMedia = __webpack_require__(21);

var _CardMedia2 = _interopRequireDefault(_CardMedia);

var _Tooltip = __webpack_require__(22);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _CardActions = __webpack_require__(23);

var _CardActions2 = _interopRequireDefault(_CardActions);

var _Box = __webpack_require__(24);

var _Box2 = _interopRequireDefault(_Box);

var _Skeleton = __webpack_require__(25);

var _Skeleton2 = _interopRequireDefault(_Skeleton);

var _reactLoaderSpinner = __webpack_require__(26);

var _reactLoaderSpinner2 = _interopRequireDefault(_reactLoaderSpinner);

var _reactCenter = __webpack_require__(27);

var _reactCenter2 = _interopRequireDefault(_reactCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridComp = exports.GridComp = function (_Component) {
    _inherits(GridComp, _Component);

    function GridComp(props) {
        _classCallCheck(this, GridComp);

        var _this = _possibleConstructorReturn(this, (GridComp.__proto__ || Object.getPrototypeOf(GridComp)).call(this, props));

        var repos = void 0;
        if (false) {
            repos = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            repos = props.staticContext.data;
        }
        _this.state = {
            repos: repos,
            loading: repos ? false : true
        };
        _this.fetchRepos = _this.fetchRepos.bind(_this);

        return _this;
    }

    _createClass(GridComp, [{
        key: 'fetchRepos',
        value: function fetchRepos(lang) {
            var _this2 = this;

            this.setState(function () {
                return {
                    loading: true
                };
            });
            this.props.fetchInitialData(lang).then(function (repos) {
                return _this2.setState(function () {
                    return {
                        repos: repos,
                        loading: false
                    };
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.state.repos) {
                this.fetchRepos(this.props.match.params.id);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _props = this.props,
                match = _props.match,
                fetchInitialData = _props.fetchInitialData;

            if (nextProps.match.params.id !== match.params.id) {
                this.fetchRepos(nextProps.match.params.id);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                repos = _state.repos,
                loading = _state.loading;


            function FormRow(repo) {
                return loading ? _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { margin: 20 },
                            _react2.default.createElement(
                                _Box2.default,
                                { display: 'flex', alignItems: 'center' },
                                _react2.default.createElement(
                                    _Box2.default,
                                    { margin: 1 },
                                    _react2.default.createElement(_Skeleton2.default, { variant: 'circle', width: 60, height: 60, animation: 'wave' })
                                ),
                                _react2.default.createElement(
                                    _Box2.default,
                                    null,
                                    _react2.default.createElement(_Skeleton2.default, { variant: 'text', width: 320, animation: 'wave' }),
                                    _react2.default.createElement(_Skeleton2.default, { variant: 'text', width: 220, animation: 'wave' })
                                )
                            ),
                            _react2.default.createElement(_Skeleton2.default, { variant: 'rect', width: 400, height: 150, animation: 'wave' })
                        )
                    )
                ) : _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { margin: 20 },
                            _react2.default.createElement(
                                _Card2.default,
                                null,
                                _react2.default.createElement(_CardHeader2.default, { style: styles.CardHeader,
                                    avatar: _react2.default.createElement(_Avatar2.default, { style: styles.large, src: repo.repo.owner.avatar_url }),
                                    action: _react2.default.createElement(
                                        _Tooltip2.default,
                                        { title: 'Github' },
                                        _react2.default.createElement(
                                            _IconButton2.default,
                                            { style: styles.iconButton },
                                            _react2.default.createElement(_Info2.default, { onClick: function onClick() {
                                                    return window.open(repo.repo.html_url);
                                                } })
                                        )
                                    ),
                                    titleTypographyProps: { variant: 'h6' },
                                    title: repo.repo.name,
                                    subheader: repo.repo.created_at.substr(0, 10)
                                }),
                                _react2.default.createElement(_CardMedia2.default, null),
                                _react2.default.createElement(
                                    _CardContent2.default,
                                    { style: styles.content },
                                    _react2.default.createElement(
                                        _Typography2.default,
                                        { variant: 'body2', color: 'textSecondary', component: 'p' },
                                        repo.repo.description
                                    )
                                ),
                                _react2.default.createElement(
                                    _CardActions2.default,
                                    { style: styles.CardBottom },
                                    _react2.default.createElement(
                                        _Tooltip2.default,
                                        { title: 'Starred : ' + repo.repo.stargazers_count },
                                        _react2.default.createElement(
                                            _IconButton2.default,
                                            { style: styles.iconButton },
                                            _react2.default.createElement(_Star2.default, null)
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _Tooltip2.default,
                                        { title: 'Homepage' },
                                        _react2.default.createElement(
                                            _IconButton2.default,
                                            { style: styles.iconButton },
                                            _react2.default.createElement(_Home2.default, { onClick: function onClick() {
                                                    return window.open(repo.repo.homepage);
                                                } })
                                        )
                                    )
                                )
                            )
                        )
                    )
                );
            }
            if (loading === true) {
                return _react2.default.createElement(
                    _reactCenter2.default,
                    { style: { margin: 300 } },
                    _react2.default.createElement(_reactLoaderSpinner2.default, { type: 'Puff',
                        color: '#AAAAAA',
                        height: 100,
                        width: 100 })
                );
            }
            return _react2.default.createElement(
                _Grid2.default,
                { container: true, spacing: 1, style: styles.mainCon },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true, item: true, xs: 28, spacing: 3 },
                    repos.map(function (repo) {
                        return _react2.default.createElement(FormRow, { repo: repo });
                    })
                )
            );
        }
    }]);

    return GridComp;
}(_react.Component);

exports.default = GridComp;


var styles = {
    CardHeader: {
        background: 'linear-gradient(to left, #283048, #859398) !important'
    },
    CardBottom: {
        background: 'linear-gradient(to top, #8e9eab, #eef2f3) !important'
    },
    content: {
        background: 'linear-gradient(to left, #ece9e6, #ffffff !important'
    },
    mainCon: {
        marginTop: 65
    },
    iconButton: {
        color: 'black !important'
    },
    large: {
        width: 60,
        height: 60
    },
    font: {
        fontSize: '1em'
    }

};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardHeader");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Avatar");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Info");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Star");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Home");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardMedia");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tooltip");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardActions");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Box");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/lab/Skeleton");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("react-loader-spinner");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-center");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchPopularRepos = fetchPopularRepos;

var _isomorphicFetch = __webpack_require__(29);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPopularRepos() {
    var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

    var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
        return data.json();
    }).then(function (repos) {
        return repos.items;
    }).catch(function (error) {
        console.warn(error);
        return null;
    });
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
    return _react2.default.createElement(
        'div',
        null,
        'Four oh Four'
    );
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Navbar;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Tab = __webpack_require__(32);

var _Tab2 = _interopRequireDefault(_Tab);

var _Tabs = __webpack_require__(33);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _AppBar = __webpack_require__(34);

var _AppBar2 = _interopRequireDefault(_AppBar);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Navbar() {
    var languages = [{
        name: 'All',
        param: 'all'
    }, {
        name: 'JavaScript',
        param: 'javascript'
    }, {
        name: 'Ruby',
        param: 'ruby'
    }, {
        name: 'Python',
        param: 'python'
    }, {
        name: 'Java',
        param: 'java'
    }];

    var _React$useState = _react2.default.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1];

    var handleChange = function handleChange(event, newValue) {
        setValue(newValue);
    };

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            _AppBar2.default,
            { position: 'fixed', style: styles.navbarStyle },
            _react2.default.createElement(
                _Tabs2.default,
                { value: value, onChange: handleChange, centered: true },
                languages.map(function (_ref) {
                    var name = _ref.name,
                        param = _ref.param;
                    return _react2.default.createElement(_Tab2.default, { key: name,
                        label: name,
                        className: true,
                        component: _reactRouterDom.Link,
                        to: '/popular/' + param,
                        selected: true });
                })
            )
        )
    );
}
var styles = {
    navbarStyle: {
        background: 'linear-gradient(to right, #fc354c, #0abfbc) !important',
        marginBottom: 10,
        padding: 7
    }
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tab");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Tabs");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ })
/******/ ]);