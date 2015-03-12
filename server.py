"""Simple HTTP server."""

import http.server
import json
import os
import pika
from urllib import parse
from tasks import published, port
from flask import Flask
from flask import request

app = Flask(__name__)

class RPCClient:
    """Generic RabbitMQ RPC client."""
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self.channel = self.connection.channel()
        result = channel.queue_declare(exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(self.on_response, no_ack=True,
                                   queue=self.callback_queue)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, queue, query):
        self.resposne = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange='',
            routing_key=queue,
            properties=pika.BasicProperties(
                reply_to = callback_queue,
                correlation_id = self.corr_id,
                ),
            body=json.dumps(query))
        while self.response is None:
            self.connection.process_data_events()
        return self.response

rpc_client = RPCClient()

@app.route('/translate/lexicon', methods=['POST', 'GET'])
def lexicon_api():
    return rpc_client.call('lexicon', request.args)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return app.send_static_file(path)

if __name__ == "__main__":
    app.run(debug=True)
