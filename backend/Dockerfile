FROM ubuntu:22.04

RUN apt update
RUN apt install python3-venv -y
COPY . /srv
WORKDIR /srv
RUN python3 -m venv .venv
RUN .venv/bin/pip install -r requirements.txt

EXPOSE 5000
CMD [ ".venv/bin/hypercorn", "app.py" ]