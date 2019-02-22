import os
import multiprocessing


tmp_dir = '/usr/tmp/'
run_dir = '/var/run/app/gunicorn/'
log_dir = '/var/log/app/gunicorn/'

name = os.environ.get('NAME')
bind = 'unix:' + os.path.join(run_dir, 'gunicorn.sock')
workers = multiprocessing.cpu_count() * 2 + 1
log_level = 'info'
log_config = os.environ.get('LOGGING_CONFIG')
limit_request_line = 4094
limit_request_fields = 100
limit_request_field_size = 8190
preload = True
no_sendfile = False
reuse_port = True
daemon = False
pid = os.path.join(run_dir, 'gunicorn.pid')
worker_tmp_dir = tmp_dir
forwarded_allow_ips = '*'
backlog = 2048
timeout = 30  # sec
graceful_timeout = 30  # sec
keep_alive = 1  # sec
access_logfile = os.path.join(log_dir, 'access.log')
error_logfile = os.path.join(log_dir, 'error.log')
capture_output = True
