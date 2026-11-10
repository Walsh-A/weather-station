from PIL import ImageDraw, ImageFont

def draw_middle_data(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    current_w: dict,
    hourly_w: dict,

):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'

    visibility: float = current_w['visibility']
    humidity: float = current_w["relative_humidity_2m"]    
    precipitation_probability: float = get_current_precipitation_probability(hourly_w, current_w)
    
    draw.text((400, 50), f"Visibility: {visibility} m", font=font, fill=0)
    draw.text((400, 75), f"Humidity: {humidity}%", font=font, fill=0)
    draw.text((400, 100), f"Precipitation: {precipitation_probability}%", font=font, fill=0)

def get_current_precipitation_probability(hourly_w: dict, current_w: dict)-> int:
    current_time: str = current_w['time']

    try: 
        index: int = hourly_w['time'].index(current_time)
    except ValueError:
        return 0

    return hourly_w['precipitation_probability'][index]