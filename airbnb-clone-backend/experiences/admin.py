from django.contrib import admin
from .models import Experiences, Perks

# Register your models here.


@admin.register(Experiences)
class ExperiencesAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "price",
        "start",
        "end",
    )


@admin.register(Perks)
class PerkAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "details",
        "description",
    )
