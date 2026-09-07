from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(120), nullable=False)
    position = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Applied")
    application_date = db.Column(db.DateTime, default=datetime.utcnow)
    location = db.Column(db.String(120), nullable=True)
    job_type = db.Column(db.String(50), nullable=True)
    salary = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "company": self.company,
            "position": self.position,
            "status": self.status,
            "application_date": (
                self.application_date.isoformat()
                if self.application_date
                else None
            ),
            "location": self.location,
            "job_type": self.job_type,
            "salary": self.salary,
            "notes": self.notes,
        }
