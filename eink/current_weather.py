from PIL import ImageDraw, ImageFont

DISPLAY_WIDTH = 800
DISPLAY_HEIGHT = 480

def draw_current_weather(
    draw: ImageDraw.ImageDraw,
    display_width: int,
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

