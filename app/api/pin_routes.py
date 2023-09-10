from flask import Blueprint, request
from app.models import Pin
from app import db
from app.forms import PinForm

pin_routes = Blueprint('pins', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@pin_routes.route("/")
def index():
    pins = Pin.query.all()
    if not pins:
        return {"errors": ['pins not found']}, 404
    print('text')
    return {'pins': [pin.to_dict() for pin in pins]}

@pin_routes.route('/new', methods=['POST'])
def create_post():
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        pin = Pin(
            user_id = form.data["user_id"],
            main_pic = form.data["main_pic"],
            title = form.data["title"],
            body = form.data["body"],
        )
        db.session.add(pin)
        db.session.commit()
        return {'pin': pin.pin_to_dict_notes()}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400