#!/usr/bin/env python3

"""Then instantiate the Babel object in your app.
Store it in a module-level variable named babel.

In order to configure available languages in our app,
you will create a Config class that has a LANGUAGES
class attribute equal to ["en", "fr"].

Use Config to set Babel’s default locale ("en")
and timezone ("UTC").

Use that class as config for your Flask app.
"""

from flask import Flask, render_template
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
# app.config.from_object(Config)
babel = Babel(app, locale_selector=Config)


@app.route("/")
def index():
    """Returns a rendered index.html template"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
