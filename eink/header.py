from PIL import ImageDraw, ImageFont


def draw_header(
    draw: ImageDraw.ImageDraw,
    display_width: int,
    date_string: str,
    time_string: str,
    location: str,
):
    font = ImageFont.load_default(size=14)
    yIndex: int = 6

    # left align
    draw.text((8, yIndex), time_string, font=font, fill=0, anchor='la')

    #  centered
    draw.text((display_width /2, yIndex), date_string, font=font, fill=0, anchor='ma')

    # right align
    draw.text((display_width - 8, yIndex), location, font=font, fill=0, anchor='ra')

    draw.line((0, 32, display_width, 32), fill=0, width=1)


