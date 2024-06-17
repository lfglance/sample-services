from os import getenv
from uuid import uuid4
from secrets import token_urlsafe
from datetime import datetime

from quart import Quart, jsonify
from quart_cors import cors


def create_app():
    app = Quart(__name__)
    app = cors(app, allow_origin="*")
    app.config["SERVER_NAME"] = getenv("SERVER_NAME", "127.0.0.1:5000")

    @app.route("/api/generate")
    async def main():
        """
        This simple route is just going to generate 
        some data and return a JSON payload.
        """
        return jsonify({
            "date": datetime.utcnow(),
            "uuid": uuid4(),
            "token": token_urlsafe(24)
        })
    
    @app.route("/api/ping")
    async def ping():
        """
        pong!
        """
        return jsonify({
            "message": "pong"
        })

    return app

create_app().run(host="0.0.0.0", port=5000)