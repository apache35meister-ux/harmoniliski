import json
import os
from typing import List, Dict, Any, Optional

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'therapists.json')

class TherapistModel:
    @classmethod
    def get_all(cls) -> List[Dict[str, Any]]:
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return []

    @classmethod
    def get_by_id(cls, therapist_id: int) -> Optional[Dict[str, Any]]:
        for t in cls.get_all():
            if t.get('id') == therapist_id:
                return t
        return None

    @classmethod
    def filter_by_city(cls, city_slug: str) -> List[Dict[str, Any]]:
        all_t = cls.get_all()
        normalized = city_slug.lower().strip()
        matched = [t for t in all_t if t.get('city', '').lower().strip() in normalized or normalized in t.get('city', '').lower().strip()]
        return matched if matched else all_t  # Fallback to all 15 if city has no specific profiles

    @classmethod
    def save_all(cls, data: List[Dict[str, Any]]) -> bool:
        try:
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f'Error saving therapists: {e}')
            return False
