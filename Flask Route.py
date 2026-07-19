from flask import Flask,request,jsonify

from report_generator import generate_startup_report

app=Flask(__name__)

@app.route("/generate-report",methods=["POST"])

def report():

    data=request.json

    idea=data["idea"]

    report=generate_startup_report(idea)

    return jsonify(report)