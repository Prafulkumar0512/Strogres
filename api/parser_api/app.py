from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import spacy
import re
app = Flask(__name__)
CORS(app)

# app.config["ENV"] = "development"


nlp = spacy.load("demo_rescue")


@app.route("/extractData", methods=["POST", "GET"])
def extractData():
    body = request.get_json()
    text = """Govardhana K Senior Software Engineer  Bengaluru, Karnataka, Karnataka - Email me on Indeed: indeed.com/r/Govardhana-K/ b2de315d95905b68  Total IT experience 5 Years 6 Months Cloud Lending Solutions INC 4 Month • Salesforce Developer Oracle 5 Years 2 Month • Core Java Developer Languages Core Java, Go Lang Oracle PL-SQL programming, Sales Force Developer with APEX.  Designations & Promotions  Willing to relocate: Anywhere  WORK EXPERIENCE  Senior Software Engineer  Cloud Lending Solutions -  Bangalore, Karnataka -  January 2018 to Present  Present  Senior Consultant  Oracle -  Bangalore, Karnataka -  November 2016 to December 2017  Staff Consultant  Oracle -  Bangalore, Karnataka -  January 2014 to October 2016  Associate Consultant  Oracle -  Bangalore, Karnataka -  November 2012 to December 2013  EDUCATION  B.E in Computer Science Engineering  Adithya Institute of Technology -  Tamil Nadu  September 2008 to June 2012  https://www.indeed.com/r/Govardhana-K/b2de315d95905b68?isid=rex-download&ikw=download-top&co=IN https://www.indeed.com/r/Govardhana-K/b2de315d95905b68?isid=rex-download&ikw=download-top&co=IN   SKILLS  APEX. (Less than 1 year), Data Structures (3 years), FLEXCUBE (5 years), Oracle (5 years), Algorithms (3 years)  LINKS  https://www.linkedin.com/in/govardhana-k-61024944/  ADDITIONAL INFORMATION  Technical Proficiency:  Languages: Core Java, Go Lang, Data Structures & Algorithms, Oracle PL-SQL programming, Sales Force with APEX. Tools: RADTool, Jdeveloper, NetBeans, Eclipse, SQL developer, PL/SQL Developer, WinSCP, Putty Web Technologies: JavaScript, XML, HTML, Webservice  Operating Systems: Linux, Windows Version control system SVN & Git-Hub Databases: Oracle Middleware: Web logic, OC4J Product FLEXCUBE: Oracle FLEXCUBE Versions 10.x, 11.x and 12.x  https://www.linkedin.com/in/govardhana-k-61024944/"""
    print(body.get("url"))
    # response = requests.post(
    #     "http://localhost:8081/extract", data={"url": body.get("url")})
    # print(response)
    doc = nlp(body.get("data"))
    data = {}
    for ent in doc.ents:
        data[ent.label_] = ent.text
    email = re.findall(
        "[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+", body.get("data"))
    if(len(email) != 0):
        data["EMAIL ADDRESS"] = email[0]

    # text = "hello this my number +917715003101"
    # number = re.search(
    #     r"^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", "hello +917715003101")
    # print(number)
    return jsonify(data)


if __name__ == "__main__":
    app.debug = True
    app.run()
