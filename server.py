import os
import sys
import json
from flask import Flask, render_template, request, jsonify, send_from_directory, redirect

# Adjust path so app modules can be imported
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.models.therapists import TherapistModel
from app.models.cities import CityModel
from app.models.analytics import AnalyticsModel

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, 'templates'),
    static_folder=BASE_DIR,
    static_url_path=''
)

# ----------------- PAGE ROUTES ----------------- #

@app.route('/')
def home():
    therapists = TherapistModel.get_all()
    return render_template('index.html', therapists=therapists)

@app.route('/index.html')
def index_redirect():
    return redirect('/', code=301)

@app.route('/panel')
@app.route('/admin')
@app.route('/yonetim')
@app.route('/panel.html')
@app.route('/admin.html')
@app.route('/yonetim.html')
def admin_panel():
    therapists = TherapistModel.get_all()
    stats = AnalyticsModel.get_stats()
    return render_template('panel.html', therapists=therapists, stats=stats)

@app.route('/<path:slug>')
def dynamic_page(slug):
    # If file exists statically, let Flask serve it
    static_path = os.path.join(BASE_DIR, slug)
    if os.path.isfile(static_path):
        return send_from_directory(BASE_DIR, slug)

    # City/district dynamic page handling
    clean_slug = slug.replace('.html', '').lower().strip()
    city_info = CityModel.get_by_slug(clean_slug)

    # Check if this slug has a dedicated static html page in root
    direct_html = os.path.join(BASE_DIR, f"{clean_slug}.html")
    if os.path.exists(direct_html):
        return send_from_directory(BASE_DIR, f"{clean_slug}.html")

    # If it's a known city slug or contains eskort
    if clean_slug in [c['slug'] for c in CityModel.get_all()] or '-eskort' in clean_slug:
        matched_therapists = TherapistModel.filter_by_city(city_info.get('name', ''))
        return render_template('city.html', city=city_info, therapists=matched_therapists)

    # Fallback to 404
    return render_template('404.html'), 404

# ----------------- REST API ROUTES ----------------- #

@app.route('/api/therapists', methods=['GET', 'POST'])
def api_therapists():
    if request.method == 'GET':
        city = request.args.get('city')
        if city:
            return jsonify(TherapistModel.filter_by_city(city))
        return jsonify(TherapistModel.get_all())
    
    # POST to update/save therapists
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({'error': 'Expected a list of therapists'}), 400
    
    success = TherapistModel.save_all(data)
    return jsonify({'success': success, 'count': len(data)})

@app.route('/api/analytics', methods=['GET', 'POST'])
def api_analytics():
    if request.method == 'GET':
        return jsonify(AnalyticsModel.get_stats())
    
    data = request.get_json() or {}
    action = data.get('action')
    if action == 'reset':
        clean_stats = AnalyticsModel.reset_stats()
        return jsonify({'success': True, 'stats': clean_stats})
    
    action_type = data.get('type', 'view')
    name = data.get('name', '')
    city = data.get('city', '')
    stats = AnalyticsModel.record_interaction(action_type, name, city)
    return jsonify({'success': True, 'stats': stats})

@app.route('/api/cities', methods=['GET'])
def api_cities():
    return jsonify(CityModel.get_all())

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"ZENSPA Python Web App running on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
