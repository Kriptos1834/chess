from channels.db import database_sync_to_async


@database_sync_to_async
def update_database_object(instance: object, updates):
    for key, value in updates.items():
        setattr(instance, key, value)
    instance.save()