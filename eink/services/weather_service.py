import requests

def get_current_weather(lat: float, lon: float) -> dict:
    url: str = "https://api.open-meteo.com/v1/forecast"
    
    params: dict = {
        "latitude": lat,
        "longitude": lon,
        "current": (
            'temperature_2m,'
            'relative_humidity_2m,'
            'dew_point_2m,'
            'apparent_temperature,'
            'weather_code,visibility,'
            'pressure_msl,'
            'wind_speed_10m,'
            'wind_gusts_10m,'
            'wind_direction_10m,'
            'rain,'            
            'snowfall'
        ),
        "hourly": ('precipitation_probability'),
        'daily': (
            'weather_code,'
            'temperature_2m_max,'
            'temperature_2m_min,'
            'precipitation_probability_max,'
            'sunrise,'
            'sunset'
        ),
        "temperature_unit": "celsius",
        "wind_speed_unit": 'kmh',
        'precipitation_unit': 'mm',
        "timezone": 'UTC'
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data: dict = response.json()

    #  Open-Meteo returns snowfall depth in cm
    # Convert cm to mm to match percipitation untis
    data["current"]["snowfall"] = data["current"]["snowfall"] * (10 / 7)

    return data
