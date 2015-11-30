# router5 link interceptor
Link interceptor for router5.

## Install
```
npm install --save router5-link-interceptor
```

## Usage
```javascript
var router = getRouter5InstanceSomehow();
var linkInterceptor = require('router5-link-interceptor');

linkInterceptor(router, function callback(err) {
  // handle navigation error here.
});
```

## License
The MIT License.
