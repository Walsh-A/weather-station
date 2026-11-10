from PIL import ImageDraw, ImageFont

def draw_current_winds(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current_w: dict,
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'

    direction: float = current_w['wind_direction_10m']
    wind_speed: float = current_w['wind_speed_10m']
    gusting: float = current_w['wind_gusts_10m']
    pressure: float = current_w['pressure_msl']    
        
    draw.text((600, 50), f"Direction: {direction} {degreeSymbol}", font=font, fill=0)
    draw.text((600, 75), f"Wind: {wind_speed} KPH", font=font, fill=0)
    draw.text((600, 100), f"Gusting: {gusting} KPH", font=font, fill=0)
    draw.text((600, 125), f"Pressure: {pressure} Pascal", font=font, fill=0)

