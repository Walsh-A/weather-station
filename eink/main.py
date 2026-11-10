from PIL import Image, ImageDraw

from datetime import datetime   

from services.weather_service import get_current_weather

from components.header import draw_header
from components.current_weather import draw_current_weather

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def main():
    now = datetime.now()

    time_string = now.strftime("%I:%M %p").lstrip("0")
    date_string = now.strftime("%A, %B %d, %Y").replace(" 0", " ")

    weather: dict = get_current_weather(39.96, -82.99)
    current_w: dict = weather['current']
    daily_w: dict = weather['daily']
    hourly_w: dict = weather['hourly']

    image = Image.new(
        "1",
        (DISPLAY_WIDTH, DISPLAY_HEIGHT),
        255,
    )

    draw = ImageDraw.Draw(image)

    draw_header(
        draw,
        DISPLAY_WIDTH,
        date_string,
        time_string,
        "Columbus, Ohio",
    )

    draw_current_weather(
        draw,
        DISPLAY_WIDTH,
        current_w,
        daily_w,
        hourly_w
    )

    image.save("weather.png")


if __name__ == "__main__":
    main()