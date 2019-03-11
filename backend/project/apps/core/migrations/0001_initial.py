# Generated by Django 2.1.7 on 2019-03-11 22:09

import apps.core.models.element
from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0002_auto_20190311_2209'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Element',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название ЛЭ')),
                (
                    'element_type',
                    models.CharField(
                        choices=[(apps.core.models.element.TypeChoice('Источник'), 'Источник'),
                                 (apps.core.models.element.TypeChoice('Земля'), 'Земля'),
                                 (apps.core.models.element.TypeChoice('Генератор'), 'Генератор'),
                                 (apps.core.models.element.TypeChoice('Анализатор'), 'Анализатор'),
                                 (apps.core.models.element.TypeChoice('И'), 'И'),
                                 (apps.core.models.element.TypeChoice('ИЛИ'), 'ИЛИ'),
                                 (apps.core.models.element.TypeChoice('НЕ'), 'НЕ'),
                                 (apps.core.models.element.TypeChoice('Исключающее ИЛИ'), 'Исключающее ИЛИ'),
                                 (apps.core.models.element.TypeChoice('ИЛИ-НЕ'), 'ИЛИ-НЕ'),
                                 (apps.core.models.element.TypeChoice('И-НЕ'), 'И-НЕ'),
                                 (apps.core.models.element.TypeChoice('Пользовательский'), 'Пользовательский')],
                        max_length=30,
                        verbose_name='Тип элемента'
                    )
                ),
                (
                    'array_of_inputs',
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(max_length=255, verbose_name='Массив имён входов'), size=None
                    )
                ),
                (
                    'array_of_outputs',
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.CharField(max_length=255, verbose_name='Массив имён выходов'), size=None
                    )
                ),
                ('time', models.IntegerField(default=0, verbose_name='Время работы')),
                ('delay', models.IntegerField(default=0, verbose_name='Время задержки')),
                ('image', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Изображение ЛЭ')),
                (
                    'Создатель ЛЭ',
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL
                    )
                ),
            ],
            options={
                'verbose_name': 'Логический Элемент',
                'verbose_name_plural': 'Логические Элементы',
            },
        ),
        migrations.CreateModel(
            name='ElementParameter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название параметра')),
                ('dimension_id', models.CharField(max_length=30, verbose_name='Размерность')),
                ('value', models.IntegerField(verbose_name='Значение')),
            ],
            options={
                'verbose_name': 'Параметр Элемента',
                'verbose_name_plural': 'Параметры Элемента',
            },
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название группы')),
                ('ВУЗ', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.Institute')),
            ],
            options={
                'verbose_name': 'Группа',
                'verbose_name_plural': 'Группы',
            },
        ),
        migrations.CreateModel(
            name='Scheme',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название схемы')),
                ('formula', models.CharField(blank=True, max_length=255, null=True, verbose_name='Формула')),
                (
                    'Создатель схемы',
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)
                ),
            ],
            options={
                'verbose_name': 'Схема',
                'verbose_name_plural': 'Схемы',
            },
        ),
        migrations.CreateModel(
            name='SchemeElement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                (
                    'coordinates',
                    django.contrib.postgres.fields.ArrayField(
                        base_field=models.IntegerField(verbose_name='Координаты'), size=None
                    )
                ),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Название ЛЭ')),
                ('ИД схемы', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Scheme')),
                ('ИД элемента', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Element')),
            ],
            options={
                'verbose_name': 'Логические Элементы Схемы',
                'verbose_name_plural': 'Логические Элементы Схемы',
            },
        ),
        migrations.CreateModel(
            name='SchemeLinks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('input_number', models.IntegerField(verbose_name='Номер входа на элементе')),
                ('output_number', models.IntegerField(verbose_name='Номер выхода на элементе')),
                (
                    'coordinate_array',
                    django.contrib.postgres.fields.ArrayField(
                        base_field=django.contrib.postgres.fields.ArrayField(
                            base_field=models.IntegerField(verbose_name='Массив координат'), size=None
                        ),
                        size=None
                    )
                ),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Название')),
                (
                    'id_input_scheme_element',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='in_link',
                        to='core.SchemeElement',
                        verbose_name='ИД ЛЭ схемы входа'
                    )
                ),
                (
                    'id_output_scheme_element',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='out_link',
                        to='core.SchemeElement',
                        verbose_name='ИД ЛЭ схемы выхода'
                    )
                ),
            ],
            options={
                'verbose_name': 'Связи схемы',
                'verbose_name_plural': 'Связи схемы',
            },
        ),
        migrations.CreateModel(
            name='SchemeTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ИД схемы', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Scheme')),
            ],
            options={
                'verbose_name': 'Тег схемы',
                'verbose_name_plural': 'Теги схемы',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Имя тега')),
            ],
            options={
                'verbose_name': 'Тег',
                'verbose_name_plural': 'Теги',
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Название единицы измерения')),
            ],
            options={
                'verbose_name': 'Единица измерения',
                'verbose_name_plural': 'Единицы измерения',
            },
        ),
        migrations.AddField(
            model_name='schemetag',
            name='ИД тега',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Tag'),
        ),
        migrations.AddField(
            model_name='elementparameter',
            name='ИД единиц измерения',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Unit'),
        ),
    ]