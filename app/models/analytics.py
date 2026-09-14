import json
import os
import time
from typing import Dict, Any

ANALYTICS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'analytics.json')

class AnalyticsModel:
    @classmethod
    def get_stats(cls) -> Dict[str, Any]:
        default_stats = {
            'totalWaClicks': 0,
            'totalCalls': 0,
            'totalViews': 0,
            'recentLogs': [],
            'lastUpdated': int(time.time() * 1000)
        }
        try:
            if os.path.exists(ANALYTICS_FILE):
                with open(ANALYTICS_FILE, 'r', encoding='utf-8') as f:
                    return json.load(f)
            return default_stats
        except Exception:
            return default_stats

    @classmethod
    def record_interaction(cls, action_type: str, name: str = '', city: str = '') -> Dict[str, Any]:
        stats = cls.get_stats()
        if action_type == 'whatsapp':
            stats['totalWaClicks'] = stats.get('totalWaClicks', 0) + 1
        elif action_type == 'call':
            stats['totalCalls'] = stats.get('totalCalls', 0) + 1
        elif action_type == 'view':
            stats['totalViews'] = stats.get('totalViews', 0) + 1

        now_str = time.strftime('%H:%M:%S', time.localtime())
        log_entry = {
            'time': now_str,
            'name': name or 'Bilinmeyen',
            'city': city or 'Genel',
            'type': 'WhatsApp Randevu' if action_type == 'whatsapp' else ('Telefon Arama' if action_type == 'call' else 'Profil Görüntüleme')
        }
        logs = stats.get('recentLogs', [])
        logs.insert(0, log_entry)
        stats['recentLogs'] = logs[:50]
        stats['lastUpdated'] = int(time.time() * 1000)

        with open(ANALYTICS_FILE, 'w', encoding='utf-8') as f:
            json.dump(stats, f, ensure_ascii=False, indent=2)

        return stats

    @classmethod
    def reset_stats(cls) -> Dict[str, Any]:
        clean_stats = {
            'totalWaClicks': 0,
            'totalCalls': 0,
            'totalViews': 0,
            'recentLogs': [],
            'lastUpdated': int(time.time() * 1000)
        }
        with open(ANALYTICS_FILE, 'w', encoding='utf-8') as f:
            json.dump(clean_stats, f, ensure_ascii=False, indent=2)
        return clean_stats
