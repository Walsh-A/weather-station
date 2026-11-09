import requests

def get_current_weather(lat: float, lon: float) -> dict:
    url: str = "https://api.open-meteo.com/v1/forecast"
    
    params: dict = {
        "latitude": lat,
        "longitude": lon,
        "current": (
            "temperature_2m,"
            'weather_code,'
            "apparent_temperature,"
            "relative_humidity_2m,"
            "wind_speed_10m"
        ),
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": 'mph',
        "timezone": 'auto'
    }

    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()

    data: dict = response.json()

    return data
