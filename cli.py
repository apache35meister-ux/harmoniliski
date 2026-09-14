#!/usr/bin/env python3
"""
ZENSPA VIP - Platform Yonetim ve Otomasyon CLI Araci
Kullanim:
  python cli.py stats               -> Canli sayac ve loglari gosterir
  python cli.py reset               -> Tiklama sayaclarini sifirlar
  python cli.py profiles            -> Aktif 15 profili listeler
  python cli.py cities              -> Tanimli sehirleri listeler
  python cli.py run [port]          -> Flask sunucusunu baslatir
"""

import sys
import os
import json

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, BASE_DIR)

from app.models.therapists import TherapistModel
from app.models.cities import CityModel
from app.models.analytics import AnalyticsModel

def show_stats():
    stats = AnalyticsModel.get_stats()
    print("=" * 45)
    print("ZENSPA CANLI ETKILESIM ISTATISTIKLERI")
    print("=" * 45)
    print(f"Toplam WhatsApp Randevu : {stats.get('totalWaClicks', 0)}")
    print(f"Toplam Telefon Arama    : {stats.get('totalCalls', 0)}")
    print(f"Toplam Goruntuleme      : {stats.get('totalViews', 0)}")
    print("-" * 45)
    print(f"Son Loglar ({len(stats.get('recentLogs', []))} adet):")
    for log in stats.get('recentLogs', [])[:10]:
        print(f"  [{log.get('time')}] {log.get('name')} ({log.get('city')}) - {log.get('type')}")
    print("=" * 45)

def reset_stats():
    AnalyticsModel.reset_stats()
    print("Tum sayaclar ve loglar temiz 0 degerlerine sifirlandi.")

def list_profiles():
    profiles = TherapistModel.get_all()
    print(f"TOPLAM AKTIF PROFIL: {len(profiles)}")
    print("-" * 55)
    for i, p in enumerate(profiles, 1):
        print(f"{i:2d}. {p.get('name', '').title():<12} | {p.get('city', '').title():<12} | WA: {p.get('wa', '')}")
    print("-" * 55)

def list_cities():
    cities = CityModel.get_all()
    print(f"TOPLAM TANIMLI SEHIR/ILCE: {len(cities)}")
    for c in cities[:20]:
        print(f"  - {c.get('name')} ({c.get('slug')})")
    if len(cities) > 20:
        print(f"  ... ve {len(cities) - 20} sehir daha.")

def run_server(port=5000):
    from server import app
    print(f"ZENSPA Web Sunucusu Baslatiliyor: http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return

    cmd = sys.argv[1].lower()
    if cmd == 'stats':
        show_stats()
    elif cmd == 'reset':
        reset_stats()
    elif cmd == 'profiles':
        list_profiles()
    elif cmd == 'cities':
        list_cities()
    elif cmd == 'run':
        port = int(sys.argv[2]) if len(sys.argv) > 2 else 5000
        run_server(port)
    else:
        print(f"Bilinmeyen komut: {cmd}")
        print(__doc__)

if __name__ == '__main__':
    main()
