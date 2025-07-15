from flask import Flask, jsonify
import json, os

app = Flask(__name__)
counter_file = "counter.json"

@app.route('/api/visit')
def visit():
    if not os.path.exists(counter_file):
        with open(counter_file, "w") as f:
            json.dump({"visits": 0}, f)

    with open(counter_file, "r") as f:
        data = json.load(f)

    data["visits"] += 1

    with open(counter_file, "w") as f:
        json.dump(data, f)

    return jsonify({"visits": data["visits"]})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
