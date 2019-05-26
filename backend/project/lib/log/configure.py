from logging.config import dictConfig

from raven.transport.requests import RequestsHTTPTransport


def configure_logging(app):
    available_handlers = {
        'stdout': app.config['LOGGING_STDOUT_ENABLED'],
        'sentry': app.config['LOGGING_SENTRY_ENABLED'],
        'json_stdout': app.config['LOGGING_JSON_STDOUT_ENABLED'],
    }
    enabled_handlers = lambda *handlers: [h for h in handlers if available_handlers.get(h)] or ['null']

    dictConfig({
        'version': 1,
        'disable_existing_loggers': True,
        'formatters': {
            'simple': {
                'format': ('%(asctime)s %(process)5d %(session_id)s %(request_id)s %(levelname)-8s %(name)s '
                           '- %(message)s')
            },
            'verbose': {
                'format': 'Process ID:         %(process)d\n' +
                          'Session ID:         %(session_id)s\n' +
                          'Request ID:         %(request_id)s\n' +
                          'Message type:       %(levelname)s\n' +
                          'Logger:             %(name)s\n' +
                          'Location:           %(pathname)s:%(lineno)d\n' +
                          'Module:             %(module)s\n' +
                          'Function:           %(funcName)s\n' +
                          'Time:               %(asctime)s\n' +
                          '\n%(message)s\n'
            },
            'json_stdout': {
                '()': 'marilyn.logging.formatters.JsonFormatter'
            }
        },
        'filters': {
            'request_context': {
                '()': 'marilyn.logging.flask.filters.RequestContextFilter'
            },
            'environ_context': {
                '()': 'marilyn.logging.filters.EnvironContextFilter',
                'mapping': {'process_group': 'PROCESS_GROUP'},
            }
        },
        'handlers': {
            'null': {
                'class': 'project.lib.log.handlers.NullHandler'
            },
            'stdout': {
                'class': 'project.lib.log.handlers.StreamHandler',
                'formatter': 'simple',
                'filters': ['request_context']
            },
            'json_stdout': {
                'class': 'project.lib.log.handlers.StreamHandler',
                'formatter': 'json_stdout',
                'filters': ['request_context', 'environ_context']
            },
            'sentry': {
                'level': 'ERROR',
                'class': 'raven.handlers.logging.SentryHandler',
                'dsn': app.config['LOGGING_SENTRY_DSN'],
                'transport': RequestsHTTPTransport,
                'tags': {
                    'environment': app.config['LOGGING_SENTRY_ENVIRONMENT']
                }
            }
        },
        'loggers': {
            'project': {
                'propagate': 0,
                'level': app.config['LOGGING_APP_LEVEL'],
                'handlers': enabled_handlers('stdout', 'sentry', 'json_stdout')
            },
            'celery': {
                'propagate': 0,
                'level': app.config['LOGGING_CELERY_LEVEL'],
                'handlers': enabled_handlers('sentry', 'json_stdout')  # Output to stdout is handled by Celery itself
            },
            'sqlalchemy.engine': {
                'propagate': 0,
                'level': app.config['LOGGING_SQLALCHEMY_LEVEL'],
                'handlers': enabled_handlers('stdout', 'sentry', 'json_stdout')
            },
            'alembic': {
                'propagate': 0,
                'level': app.config['LOGGING_ALEMBIC_LEVEL'],
                'handlers': enabled_handlers('stdout', 'json_stdout')
            },
            'marilyn': {
                'propagate': 0,
                'level': app.config['LOGGING_APP_LEVEL'],
                'handlers': enabled_handlers('stdout', 'sentry', 'json_stdout')
            }
        },
        'root': {
            'level': app.config['LOGGING_ROOT_LEVEL'],
            'handlers': enabled_handlers('stdout', 'sentry', 'json_stdout')
        }
    })

    from marilyn.logging import excepthook
    excepthook = excepthook
