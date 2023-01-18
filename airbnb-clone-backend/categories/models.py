from django.db import models
from common.models import CommonModel

# Create your models here.
class Category(CommonModel):
    class CategoryKindChoices(models.TextChoices):
        ROOMS = "rooms", "Rooms"
        EXPERIENCES = "experiences", "Experiences"

    """Room or Experience Categories"""

    name = models.CharField(max_length=50)
    kind = models.CharField(
        max_length=30,
        choices=CategoryKindChoices.choices,
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{self.kind.title()}: {self.name}"
