from PIL import Image, ImageDraw

from datetime import datetime   

from header import draw_header
from current_weather import draw_current_weather

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def main():
    now = datetime.now()

    time_string = now.strftime("%I:%M %p").lstrip("0")
    date_string = now.strftime("%A, %B %d, %Y").replace(" 0", " ")

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
        "58°",
        "Clear Sky",
        "52°",
        "48%",
        "8.08 MPH",
    )

    image.save("weather.png")


if __name__ == "__main__":
    main()