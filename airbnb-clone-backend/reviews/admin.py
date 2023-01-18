from django.contrib import admin
from .models import Reveiw

# Register your models here.


@admin.register(Reveiw)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "__str__",
        "payload",
    )
    list_filter = ("rating",)
