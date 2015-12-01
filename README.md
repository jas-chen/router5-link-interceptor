# router5 link interceptor
Link interceptor for [router5](http://router5.github.io/).

## Install
```
npm install --save router5-link-interceptor
```



## API
```javascript
linkInterceptor(router5, opts, [callback]);
```
Intercept all click events of links and call the [Router5 navigate method](http://router5.github.io/docs/navigation.html). Query string of the link will be parsed into `routeParams`.

###### Arguments
1. `router5` (*Router5*): Router5 instance.
2. `opts` (*Object* or *Function*): The `opts` argument of [Router5 navigate method](http://router5.github.io/docs/navigation.html#navigating-to-a-specific-route). If you pass a Function, it will be called with `fn(routeName, routeParams)`.
3. `[callback]` (*Function*): The `callback` argument of [Router5 navigate method](http://router5.github.io/docs/navigation.html#navigating-to-a-specific-route).

###### Returns
(*Function*): A function to stop the interceptor.



## Usage

#### Basic
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();
function callback(err) {
  console.error(err);
}

linkInterceptor(router, {}, callback);
```

#### With opts object
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();

function callback(err) {
  console.error(err);
}

linkInterceptor(router, {reload: true}, callback);
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
  console.error(err);
}

linkInterceptor(router, opts, callback);
```

## License
The MIT License.
