from PIL import ImageDraw, ImageFont

def draw_current_temperatures(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current_w: dict,
    daily_w: dict
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'
    
    temperature: float = current_w["temperature_2m"]
    feels_like:float = current_w["apparent_temperature"]
    dew_point:float = current_w["dew_point_2m"]
    high_temp: float = daily_w['temperature_2m_max'][0]
    low_temp: float = daily_w['temperature_2m_min'][0]

    draw.text((200, 50), f"Temperature: {temperature}{degreeSymbol} C", font=font, fill=0)
    draw.text((200, 75), f"Feels Like: {feels_like}{degreeSymbol}", font=font, fill=0)
    draw.text((200, 100), f"Dew Point: {dew_point}{degreeSymbol}", font=font, fill=0)
    draw.text((200, 125), f"{high_temp}{degreeSymbol} / {low_temp}{degreeSymbol}", font=font, fill=0)

    

