from django.db import models
from common.models import CommonModel

# Create your models here.
class Room(CommonModel):

    """room model definition"""

    class RoomKindChoices(models.TextChoices):
        ENTIRE_PLACE = "entire_place", "Entire Place"
        PRIVATE_ROOM = "private_room", "Private Room"
        SHARED_ROOM = "shared_room", "Shared Room"

    country = models.CharField(
        max_length=50,
        default="Great Britain",
    )
    city = models.CharField(
        max_length=80,
        default="London",
    )
    name = models.CharField(max_length=180, default="")
    price = models.PositiveIntegerField()
    toilets = models.PositiveIntegerField()
    rooms = models.PositiveIntegerField()
    description = models.TextField()
    addresss = models.CharField(max_length=250)
    pet_friendly = models.BooleanField(default=True)
    kind = models.CharField(
        max_length=20,
        choices=RoomKindChoices.choices,
    )
    owner = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
    )
    amenities = models.ManyToManyField("rooms.Amenity")

    def __str__(self):
        return self.name


class Amenity(CommonModel):
    """Amenity definition"""

    name = models.CharField(max_length=150)
    description = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Amenities"
