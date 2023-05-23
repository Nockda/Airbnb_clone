from django.contrib import admin
from .models import Room, Amenity


@admin.action(description="Set All Prices discount 10percents")
def reset_prices(model_admin, request, rooms):
    for room in rooms.all():
        room.price = room.price * 0.9
        room.save()


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    actions = (reset_prices,)
    list_display = (
        "name",
        "city",
        "price",
        "total_amenities",
        "kind",
        "owner",
        "rating",
    )
    list_filter = (
        "price",
        "pet_friendly",
        "city",
        "country",
        "toilet",
        "rooms",
        "amenities",
    )
    search_fields = (
        "owner__username",
        "name",
    )

    def total_amenities(self, room):
        return room.amenities.count()


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
