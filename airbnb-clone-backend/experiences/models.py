from django.db import models
from common.models import CommonModel


# Create your models here.


class Experiences(CommonModel):
    name = models.CharField(max_length=250)
    country = models.CharField(max_length=50, default="United Kingdom")
    city = models.CharField(max_length=80, default="London")
    price = models.PositiveIntegerField()
    address = models.CharField(
        max_length=100,
    )
    host = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="experiences",
    )
    start = models.TimeField()
    end = models.TimeField()
    description = models.TextField()
    perks = models.ManyToManyField(
        "experiences.Perk",
        related_name="experiences",
    )
    category = models.ForeignKey(
        "categories.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="experiences",
    )

    def __str__(self) -> str:
        return self.name


class Perk(CommonModel):

    """what is included in an experiences"""

    name = models.CharField(max_length=100)
    details = models.CharField(max_length=250, blank=True, null=True)
    explanation = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name
