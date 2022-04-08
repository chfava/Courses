To run: 

On Ubuntu, you can follow these steps or use install.sh.

1. Install python 3.5

Windows: 
> Get an installer from https://www.python.org/downloads/release/python-354/
Ubuntu: 
> sudo apt-get update && sudo apt-get install python3.5

2. Install dependencies

> pip3 install -r requirements.txt

3. If you install any packages, update requirements.txt with: 

> pip3 freeze > requirements.txt

4. Start the server (see here if needed: http://flask.pocoo.org/docs/1.0/quickstart/)

Windows: 
> set FLASK_APP=server.py && flask run

If you get encoding errors, you can try this also: 

> set FLASK_APP=server.py && set PYTHONIOENCODING=UTF-8 && flask run

Ubuntu: 
> export FLASK_APP=server.py && flask run

5. Check the server is up at http://127.0.0.1:5000/






