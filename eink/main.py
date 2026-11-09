from PIL import Image, ImageDraw, ImageFont


DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480


def draw_header(
    draw: ImageDraw.ImageDraw,
    date_string: str,
    time_string: str,
    location: str,
):
    font = ImageFont.load_default()

    draw.text((10, 8), time_string, font=font, fill=0)
    draw.text((300, 8), date_string, font=font, fill=0)
    draw.text((675, 8), location, font=font, fill=0)
    draw.line((0, 32, DISPLAY_WIDTH, 32), fill=0, width=1)


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
    image = Image.new(
        "1",
        (DISPLAY_WIDTH, DISPLAY_HEIGHT),
        255,
    )

    draw = ImageDraw.Draw(image)

    draw_header(
        draw,
        "Monday, November 9, 2026",
        "1:40 PM",
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