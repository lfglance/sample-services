from socket import gethostname
from uuid import uuid4
from secrets import token_urlsafe
from datetime import datetime

from quart import Quart, jsonify
from quart_cors import cors


def create_app():
    app = Quart(__name__)
    app = cors(app, allow_origin="*")

    @app.before_request
    def set_server_name():
        app.config['SERVER_NAME'] = None

    @app.route("/api/generate")
    async def main():
        """
        This simple route is just going to generate 
        some data and return a JSON payload.
        """
        return jsonify({
            "date": datetime.utcnow(),
            "uuid": uuid4(),
            "host": gethostname(),
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