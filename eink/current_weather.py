from PIL import ImageDraw, ImageFont

from shared.weather_codes import get_weather_description

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def draw_current_weather(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current: dict
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'

    weather_code: float = current['weather_code']
    weather_code_description: str = get_weather_description(weather_code)
    temperature: float = current["temperature_2m"]
    feels_like:float = current["apparent_temperature"]
    humidity: float = current["relative_humidity_2m"]
    wind_speed: float = current['wind_speed_10m']

    draw.text((25, 50), f"Temperature: {temperature}{degreeSymbol} F", font=font, fill=0)
    draw.text((25, 75), f"Weather Code: {weather_code} - {weather_code_description}", font=font, fill=0)

    draw.text((250, 50), f"Feels Like: {feels_like}{degreeSymbol} F", font=font, fill=0)
    draw.text((250, 75), f"Humidity: {humidity}%", font=font, fill=0)
    draw.text((250, 100), f"Wind: {wind_speed} MPH", font=font, fill=0)

