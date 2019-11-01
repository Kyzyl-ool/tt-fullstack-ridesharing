from flask import request, jsonify
from flask_login import login_required, current_user

from app import db
from main_app.model import Driver
from main_app.schemas import RegisterDriverSchema
from main_app.views import api
from utils.exceptions import ResponseExamples
from utils.misc import validate_all, validate_params_with_schema, validate_is_in_db, validate_is_authorized_with_id


@api.route('/register_driver', methods=['POST'])
@login_required
def register_driver():
    data = request.get_json()
    user_id = data.get('user_id')
    errors = validate_all([
        validate_params_with_schema(RegisterDriverSchema(), data=data),
        validate_is_in_db(db, user_id),
        validate_is_authorized_with_id(user_id, current_user),
    ])
    if errors:
        return errors
    driver = Driver(
        id=int(user_id),
        driver_license_1=data['license_1'],
        driver_license_2=data['license_2']
    )
    db.session.add(driver)
    try:
        db.session.commit()
    except Exception as e:
        error = ResponseExamples.UNHANDLED_ERROR
        error['value'] = e.args
        return jsonify(error), 400
    return jsonify(user_id=driver.id)