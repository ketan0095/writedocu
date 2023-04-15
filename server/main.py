from flask import Flask, jsonify, request
from flask_cors import CORS
import time
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return jsonify({
        "status": 200,
        "msg": "connected!"
    })


@app.route('/ai/generate-result', methods=['POST'])
def generate_results():

    try:
        headers = request.headers

        if headers['X_KEY'] == "test123":

            payload = request.json

            print("payload :", payload)

            username = payload["username"]
            timestamp = time.time()
            prompt = payload["prompt"]
            documentStandard = payload["documentStandard"]
            promptSave = payload["promptSave"]
            maxWordCount = payload["maxWordCount"]

            return jsonify({
                "status": 200,
                "msg": "this is the result generated"
            })
        else:
            return jsonify({
                "status": 502,
                "msg": "not allowed"
            })

    except Exception as e:
        return jsonify({
            "status": 501,
            "msg": "error : {}".format(e)
        })


if "__main__" == __name__:
    app.run(host="0.0.0.0", port=2929, debug=True)
