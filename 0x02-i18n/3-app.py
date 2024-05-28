#!/usr/bin/env python3

"""Use the _ or gettext function to parametrize your
templates. Use the message IDs home_title and home_header.
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
def get_locale():
    """Determines & Returns the best match
    with the supported languages.
    """
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/")
def index():
    """Returns a rendered index.html template"""
    return render_template("3-index.html")


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
