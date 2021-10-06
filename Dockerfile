FROM python:3.8

ENV PYTHONUNBUFFERED 1
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG SECRET_KEY

ENV DB_HOST $DB_HOST
ENV DB_NAME $DB_NAME
ENV DB_USER $DB_USER
ENV DB_PASSWORD $DB_PASSWORD
ENV SECRET_KEY $SECRET_KEY

COPY . /code/
WORKDIR /code/

RUN pip3 install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
