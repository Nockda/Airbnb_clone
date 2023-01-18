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

    category = models.ForeignKey(
        "categories.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return self.name


class Amenity(CommonModel):
    """Amenity definition"""

    name = models.CharField(max_length=150)
    description = models.CharField(max_length=150, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Amenities"

    def __str__(self):
        return self.name
