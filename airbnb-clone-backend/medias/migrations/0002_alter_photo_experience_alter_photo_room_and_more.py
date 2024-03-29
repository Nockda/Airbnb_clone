# Generated by Django 4.2.1 on 2023-05-22 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('experiences', '0003_alter_experiences_category_alter_experiences_host_and_more'),
        ('rooms', '0006_alter_room_amenities_alter_room_category_and_more'),
        ('medias', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='experience',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='experiences.experiences'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='room',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='rooms.room'),
        ),
        migrations.AlterField(
            model_name='video',
            name='experience',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='experiences.experiences'),
        ),
    ]
