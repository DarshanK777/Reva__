# Generated by Django 3.0.5 on 2020-05-08 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20200508_0513'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='follows',
            field=models.ManyToManyField(related_name='followers', to='accounts.Profile'),
        ),
    ]
