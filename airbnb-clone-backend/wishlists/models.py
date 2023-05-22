from django.db import models
from common.models import CommonModel

# Create your models here.


class Wishlist(CommonModel):
    """wishlist model definistion"""

    name = models.CharField(max_length=150)
    rooms = models.ManyToManyField(
        "rooms.Room",
    )
    experiences = models.ManyToManyField("experiences.Experiences")
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return self.name