from PIL import ImageDraw, ImageFont

from shared.weather_codes import get_weather_description
from components.current_temperatures import draw_current_temperatures
from components.middle_data_display import draw_middle_data

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def draw_current_weather(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current_w: dict,
    dailly_w: dict,
    hourly_w: dict
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'

    weather_code: float = current_w['weather_code']
    weather_code_description: str = get_weather_description(weather_code)
        
    draw.text((25, 75), f"Weather Code: {weather_code} - {weather_code_description}", font=font, fill=0)
    draw_current_temperatures(draw, display_width, current_w)
    draw_middle_data(draw, display_width, current_w, hourly_w)

