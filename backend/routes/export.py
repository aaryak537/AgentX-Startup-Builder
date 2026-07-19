"""
AgentX Startup Builder
Export Routes

Handles:
- Export startup report as PDF
- Export startup data as JSON

Author: AgentX Team
"""


from flask import Blueprint, request, jsonify, send_file
from datetime import datetime
import os
import json


# PDF Library
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet



# Blueprint creation

export_bp = Blueprint(
    "export",
    __name__,
    url_prefix="/api/export"
)



# Folder to store generated files

EXPORT_FOLDER = "generated"

if not os.path.exists(EXPORT_FOLDER):
    os.makedirs(EXPORT_FOLDER)



# =====================================================
# EXPORT STARTUP REPORT AS PDF
# =====================================================


@export_bp.route("/pdf", methods=["POST"])
def export_pdf():

    try:

        data = request.json


        if not data:
            return jsonify({
                "success": False,
                "message": "No startup data provided"
            }),400



        startup_name = data.get(
            "startupName",
            "AgentX Startup"
        )


        filename = (
            startup_name
            .replace(" ","_")
            +
            "_report.pdf"
        )


        filepath = os.path.join(
            EXPORT_FOLDER,
            filename
        )



        # Create PDF

        pdf = SimpleDocTemplate(
            filepath,
            pagesize=letter
        )


        styles = getSampleStyleSheet()

        content=[]



        content.append(
            Paragraph(
                "AgentX Startup Builder Report",
                styles["Title"]
            )
        )


        content.append(
            Spacer(1,20)
        )



        # Add all startup information

        for key,value in data.items():


            text = f"""
            <b>{key}</b><br/>
            {value}
            """


            content.append(
                Paragraph(
                    str(text),
                    styles["BodyText"]
                )
            )


            content.append(
                Spacer(1,10)
            )



        pdf.build(content)



        return jsonify({

            "success":True,

            "message":
            "PDF generated successfully",

            "download":
            f"/api/export/download/{filename}"

        })



    except Exception as e:


        return jsonify({

            "success":False,

            "error":str(e)

        }),500





# =====================================================
# DOWNLOAD GENERATED PDF
# =====================================================


@export_bp.route(
    "/download/<filename>",
    methods=["GET"]
)

def download_pdf(filename):


    try:

        filepath=os.path.join(
            EXPORT_FOLDER,
            filename
        )


        if not os.path.exists(filepath):

            return jsonify({

                "success":False,

                "message":
                "File not found"

            }),404



        return send_file(
            filepath,
            as_attachment=True
        )



    except Exception as e:


        return jsonify({

            "success":False,

            "error":str(e)

        }),500






# =====================================================
# EXPORT STARTUP DATA AS JSON
# =====================================================


@export_bp.route(
    "/json",
    methods=["POST"]
)

def export_json():


    try:


        data=request.json


        if not data:

            return jsonify({

                "success":False,

                "message":
                "No data received"

            }),400




        filename = (
            "startup_"
            +
            datetime.now()
            .strftime("%Y%m%d_%H%M%S")
            +
            ".json"
        )



        filepath=os.path.join(
            EXPORT_FOLDER,
            filename
        )



        with open(
            filepath,
            "w",
            encoding="utf-8"
        ) as file:


            json.dump(
                data,
                file,
                indent=4,
                ensure_ascii=False
            )



        return jsonify({

            "success":True,

            "message":
            "JSON exported successfully",

            "file":
            filename

        })



    except Exception as e:


        return jsonify({

            "success":False,

            "error":str(e)

        }),500