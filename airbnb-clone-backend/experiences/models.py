from django.db import models
from common.models import CommonModel

# Create your models here.
class Experiences(CommonModel):

    name = models.CharField(max_length=250)
    country = models.CharField(
        max_length=50,
        default="Great Britain",
    )
    city = models.CharField(
        max_length=80,
        default="London",
    )
    host = models.ForeignKey("users.User", on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=0)
    address = models.CharField(max_length=250)
    start = models.TimeField()
    end = models.TimeField()
    description = models.TextField()
    perks = models.ManyToManyField("experiences.Perks")

    category = models.ForeignKey(
        "categories.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    def __str__(self):
        return self.name


class Perks(CommonModel):
    """what is included on an experiences"""

    name = models.CharField(max_length=100)
    details = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Perks"
