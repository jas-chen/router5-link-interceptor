# router5 link interceptor
Link interceptor plugin for [router5](http://router5.github.io/).

## Install
```
npm install --save router5-link-interceptor
```



## API
```javascript
router.usePlugin(linkInterceptor(opts, [callback]));
```
Register a plugin to intercept all click events of links and call the [Router5 navigate method](http://router5.github.io/docs/navigation.html). Query string of the link will be parsed into `routeParams`.

###### Arguments
1. `opts` (*Object* or *Function*): The `opts` argument of [Router5 navigate method](http://router5.github.io/docs/navigation.html#navigating-to-a-specific-route). If you pass a Function, it will be called with `fn(routeName, routeParams)`.
2. `[callback]` (*Function*): The `callback` argument of [Router5 navigate method](http://router5.github.io/docs/navigation.html#navigating-to-a-specific-route).

###### Start and stop
The plugin only intercepts links when your router instance is started.



## Usage

#### Basic
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();

function callback(err) {
  if (err) console.error(err);
}

router.usePlugin(linkInterceptor({}, callback));
```

#### With opts object
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();

function callback(err) {
  if (err) console.error(err);
}

router.usePlugin(linkInterceptor({reload: true}, callback));
```

#### With opts function
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();

function opts(routeName, routeParams) {
  if (routeName === 'home') {
    return {reload: true};
  }

  return {};
}

function callback(err) {
  if (err) console.error(err);
}

router.usePlugin(linkInterceptor(opts, callback));
```

## Changelog

- **3.0.0** - Make the link interceptor as a router5 plugin([d380fb2](https://github.com/jas-chen/router5-link-interceptor/commit/d380fb276a83cedf0b18ffd0348b95ef33479821),  [#1](https://github.com/jas-chen/router5-link-interceptor/issues/1)).


## License
The MIT License.
