#!/usr/bin/env python3

"""In this task, you will implement a way to force
a particular locale by passing the locale=fr
parameter to your app’s URLs.

In your get_locale function, detect if the incoming
request contains locale argument and ifs value is
a supported locale, return it. If not or if the
parameter is not present, resort to the previous
default behavior.

Now you should be able to test different translations
by visiting http://127.0.0.1:5000?locale=[fr|en].

Visiting http://127.0.0.1:5000/?locale=fr should
display this level 1 heading: 
Bonjour monde!
"""

from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """A class that has:
    - LANGUAGES class attribute equal to ["en", "fr"]
    - And set Babel’s default:
    - locale ("en") and
    - timezone ("UTC")
    """

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """Determines & Returns the best match
    with the supported languages.
    Detect if the incoming request contains
    locale argument and ifs value is
    a supported locale, return it.
    """
    if request.args.get("locale") in app.config["LANGUAGES"]:
        return request.args.get("locale")
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index() -> str:
    """Returns a rendered index.html template"""
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
