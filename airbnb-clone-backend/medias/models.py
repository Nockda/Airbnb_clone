from django.db import models
from common.models import CommonModel


class Photo(CommonModel):
    file = models.URLField()
    description = models.CharField(
        max_length=150,
    )
    room = models.ForeignKey(
        "rooms.Room",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="photos",
    )
    experience = models.ForeignKey(
        "experiences.Experiences",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="photos",
    )

    def __str__(self) -> str:
        return "Photo file"


class Video(CommonModel):
    file = models.URLField()
    experience = models.OneToOneField(
        "experiences.Experiences",
        on_delete=models.CASCADE,
        related_name="videos",
    )

    def __str__(self) -> str:
        return "Video file"
