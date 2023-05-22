from django.contrib import admin
from .models import Room, Amenity

# Register your models here.


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "city",
        "price",
        "kind",
        "owner",
    )
    list_filter = (
        "price",
        "pet_freindly",
        "city",
        "country",
        "toilet",
        "rooms",
        "amenities",
    )


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created_at",
        "updated_at",
    )
    list_filter = (
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )
