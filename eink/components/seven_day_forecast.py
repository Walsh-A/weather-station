from PIL import ImageDraw, ImageFont

from components.current_temperatures import draw_high_low_temperatures

def draw_seven_day_forecast(
    draw: ImageDraw.ImageDraw,
    display_width: int,    
    daily_w: dict,
):
    font = ImageFont.load_default()

    # TODO implement user settings
    degreeSymbol: str = '\u00B0'

    times: list[str] = daily_w['time']
    weather_codes: list[str] = daily_w['weather_code']
    temperature_2m_maxes: list[str] = daily_w['temperature_2m_max']
    temperature_2m_mins: list[str] = daily_w['temperature_2m_min']
    precipitation_probability_maxes: list[str] = daily_w['precipitation_probability_max']
    sunrises: list[str] = daily_w['sunrise']
    sunsets: list[str]= daily_w['sunset']

    for x in range(len(times)):
      date_string = times[x]
      weather_code = weather_codes[x]
      high_temperature = temperature_2m_maxes[x]
      low_temperature = temperature_2m_mins[x]
      precipitation_probability = precipitation_probability_maxes[x]
      sunrise_time = sunrises[x]
      sunset_time = sunsets[x]
      
      draw_forecast_cart(draw, display_width, x, date_string, weather_code, high_temperature, low_temperature, precipitation_probability, sunrise_time, sunset_time)

def draw_forecast_cart(
      draw: ImageDraw.ImageDraw, 
      display_width: int,   
      index,        
      date_string,            
      weather_code,            
      high_temperature,            
      low_temperature,            
      precipitation_probability,            
      sunrise_time,            
      sunset_time
      ):

    font = ImageFont.load_default()
    
    card_width: float = display_width / 7
    x_position: float = index * card_width

    draw.text((x_position, 250), f'{date_string}', font=font, fill=0)
    draw.text((x_position, 275), f'{weather_code}', font=font, fill=0)
    draw_high_low_temperatures(draw, high_temperature, low_temperature, x_position, 300)
    draw.text((x_position, 325), f'{precipitation_probability}', font=font, fill=0)
    draw.text((x_position, 350), f'{sunrise_time} - {sunset_time}', font=font, fill=0)


    # weather_code: float = current_w['weather_code']
    # draw.text((25, 75), f"Weather Code: {weather_code} - {weather_code_description}", font=font, fill=0)
    

