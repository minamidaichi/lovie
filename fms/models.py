from django.db import models


class DirTag(models.Model):
    dir_path  = models.CharField(max_length=100, db_index=True)
    word      = models.CharField(max_length=20, db_index=True)
    tfidf_val = models.IntegerField()

class FileDir(models.Model):
    parent_id = models.IntegerField(null=True)
    path      = models.CharField(max_length=100, default="root", db_index=True)
    name      = models.CharField(max_length=100)
    m_time    = models.DateTimeField(null=True)
    size      = models.IntegerField(null=True)