Svstantia
=========

Svstantia is a simple blog platform powered by
[Substance.io](http://substance.io).

Easily deployable to Heroku and configured.


## Installing

You can install it via *npm*.

    npm install svbstantia


## Configuring

To configure Svbstantia simply `create` a new instance passing the
configuration object as follows. Look the source code for more
information.

```javascript
  var Svbstantia = require('svbstantia');

  var port = process.env.PORT || 3000;

  Svbstantia.create({
    author: {
      name: "<< your fantastic name >>",
      email: "<< your email address >>",
    },
    name: "<< the name of your awesome blog >>",
    username: "<< your Substance.io username >>",
    app: {
      port: port
    },
    ga: "<< your Google Analyctics TM token >>"
  }, function () {
    console.log( "Cool! Svbstantia started listening on port " + port );
  });
```

## License

MIT licensed. [Read it](https://github.com/yuchi/svbstantia/raw/master/LICENSE).
