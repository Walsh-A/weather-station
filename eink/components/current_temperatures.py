from PIL import ImageDraw, ImageFont

def draw_current_temperatures(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current: dict
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'
    
    temperature: float = current["temperature_2m"]
    feels_like:float = current["apparent_temperature"]
    dew_point:float = current["dew_point_2m"]

    draw.text((200, 50), f"Temperature: {temperature}{degreeSymbol} C", font=font, fill=0)
    draw.text((200, 75), f"Feels Like: {feels_like}{degreeSymbol} C", font=font, fill=0)
    draw.text((200, 100), f"Dew Point: {dew_point}{degreeSymbol} C", font=font, fill=0)

    

