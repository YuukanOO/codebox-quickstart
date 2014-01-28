codebox-quickstart [![Build Status](https://travis-ci.org/YuukanOO/codebox-quickstart.png)](https://travis-ci.org/YuukanOO/codebox-quickstart)
=====================

Command line tool to generate addon skeleton for [codebox](https://github.com/FriendCode/codebox).

Installation
--------------------

Use `npm` to install it: `npm install codebox-quickstart -g`.

Usage
--------------------

See below for common options or `codebox-quickstart -h`.

Option | Description
--- | ---
-s, --serverside | If this flags is set, it will generates basic code for codebox add-on with server side component
-c, --consumes | Given a comma separated list of names, it will generates code for an addon which consumes given services
-p, --provides | Given a comma separated list of names, it will generates code for an addon which provides given services
-e, --expert | If this flag is set, the generator will remove all comments in the generated files