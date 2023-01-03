from django.db import models

# Create your models here.
class House(models.Model):
    
    """Model definition for houses"""
    
    name = models.CharField(max_length=140)
    price_per_night = models.PositiveIntegerField()
    description = models.TextField()
    address = models.CharField(max_length=140)
    pet_allowed = models.BooleanField(default=True, 
    help_text="Does this house allowed pets?", verbose_name="Pets Allowed")

    def __str__(self):
        return self.name