from flask import Flask, render_template


app = Flask(__name__)
app.config['SECRET_KEY']="sdjlikagd54fg35dfgaf6f4j4r5t4h5sfdgnb"

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True,
            host="0.0.0.0",
            port=80)
