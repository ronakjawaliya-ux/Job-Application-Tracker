from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, JobApplication


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///job_tracker.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Job Application Tracker API is running"
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/api/applications", methods=["GET"])
def get_applications():
    applications = JobApplication.query.order_by(
        JobApplication.id.desc()
    ).all()

    return jsonify([
        application.to_dict()
        for application in applications
    ])


@app.route("/api/applications", methods=["POST"])
def create_application():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body must contain JSON"
        }), 400

    if not data.get("company") or not data.get("position"):
        return jsonify({
            "error": "Company and position are required"
        }), 400

    application = JobApplication(
        company=data["company"],
        position=data["position"],
        status=data.get("status", "Applied"),
        location=data.get("location"),
        job_type=data.get("job_type"),
        salary=data.get("salary"),
        notes=data.get("notes")
    )

    db.session.add(application)
    db.session.commit()

    return jsonify(application.to_dict()), 201


@app.route("/api/applications/<int:application_id>", methods=["GET"])
def get_application(application_id):
    application = db.session.get(JobApplication, application_id)

    if not application:
        return jsonify({
            "error": "Application not found"
        }), 404

    return jsonify(application.to_dict())


@app.route("/api/applications/<int:application_id>", methods=["PUT"])
def update_application(application_id):
    application = db.session.get(JobApplication, application_id)

    if not application:
        return jsonify({
            "error": "Application not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body must contain JSON"
        }), 400

    if "company" in data:
        application.company = data["company"]

    if "position" in data:
        application.position = data["position"]

    if "status" in data:
        application.status = data["status"]

    if "location" in data:
        application.location = data["location"]

    if "job_type" in data:
        application.job_type = data["job_type"]

    if "salary" in data:
        application.salary = data["salary"]

    if "notes" in data:
        application.notes = data["notes"]

    db.session.commit()

    return jsonify(application.to_dict())


@app.route("/api/applications/<int:application_id>", methods=["DELETE"])
def delete_application(application_id):
    application = db.session.get(JobApplication, application_id)

    if not application:
        return jsonify({
            "error": "Application not found"
        }), 404

    db.session.delete(application)
    db.session.commit()

    return jsonify({
        "message": "Application deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True)
