# router5 link interceptor
Link interceptor for [router5](http://router5.github.io/).

## Install
```
npm install --save router5-link-interceptor
```

## Usage
```javascript
var linkInterceptor = require('router5-link-interceptor');
var router = getRouter5InstanceSomehow();

linkInterceptor(router, function callback(err) {
  // handle navigation error here.
});
```

## License
The MIT License.
