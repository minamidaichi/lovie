python manage.py makemigrations
python manage.py migrate
uwsgi --ini ./devops/uwsgi/uwsgi.ini
