from django.db import models
from common.models import CommonModel

# Create your models here.
class Photo(CommonModel):
    file = models.ImageField()
    description = models.CharField(
        max_length=140,
    )
    room = models.ForeignKey(
        "rooms.Room",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    experience = models.ForeignKey(
        "experiences.Experiences",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self) -> str:
        return "Photo file"


class Video(CommonModel):
    file = models.FileField()
    experience = models.OneToOneField(
        "experiences.Experiences",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self) -> str:
        return f"{self.experience} / Video file"
