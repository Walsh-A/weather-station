from PIL import Image, ImageDraw, ImageFont

from datetime import datetime   
from header import draw_header

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def draw_current_weather(
    draw: ImageDraw.ImageDraw,
    temp: str,
    condition: str,
    feels_like: str,
    humidity: str,
    wind: str,
):
    font = ImageFont.load_default()

    draw.text((25, 50), temp, font=font, fill=0)
    draw.text((25, 75), condition, font=font, fill=0)

    draw.text((250, 50), f"Feels Like: {feels_like}", font=font, fill=0)
    draw.text((250, 75), f"Humidity: {humidity}", font=font, fill=0)
    draw.text((250, 100), f"Wind: {wind}", font=font, fill=0)


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
        "58°",
        "Clear Sky",
        "52°",
        "48%",
        "8.08 MPH",
    )

    image.save("weather.png")


if __name__ == "__main__":
    main()