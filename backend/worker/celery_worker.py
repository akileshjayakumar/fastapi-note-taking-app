from celery import Celery

# Create a new Celery instance and configure the broker (RabbitMQ) and backend (Redis)
celery_app = Celery(
    'worker',
    broker='amqp://guest:guest@localhost//',
    backend='redis://localhost:6379/0'
)


@celery_app.task
def add_together(a, b):
    return a + b
