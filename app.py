from flask import Flask, render_template, jsonify, request, Markup
from model import predict_image
import utils

app = Flask(__name__, static_folder='static', template_folder="templates")

@app.route('/')
def home():
    return render_template('index2.html')


# @app.route('/predict', methods=['GET', 'POST'])
# def predict():
#     if request.method == 'POST':
#         try:
#             file = request.files['file']
#             img = file.read()
#             prediction = predict_image(img)
#             print('before peredd')
#             res = utils.disease_dic.get(prediction, "Unknown disease")
#             print(res)
#             print('after prede')
#             return render_template('display.html', result=res)
        # except Exception as e:
        #     print(f"Exception: {str(e)}")
        #     return render_template('index2.html', status=500, res="Internal Server Error")
    #     except Exception as e:
    #         import traceback
    #         print(f"Exception: {str(e)}")
    #         traceback.print_exc()
    #         return render_template('index2.html', status=500, res="Internal Server Error")

    # return render_template('index2.html')



# from flask import Flask, render_template, request
# from model import predict_image
# import utils

# app = Flask(__name__, static_folder='static', template_folder="templates")

# ... (Other routes)

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            file = request.files['file']
            img = file.read()
            prediction = predict_image(img)
            res = utils.disease_dic.get(prediction, "Unknown disease")

            # Use the dynamic HTML content from utils.py
            dynamic_html_content = utils.disease_dic.get(prediction, f"<b>Crop</b>: Unknown <br/>Disease: {res}<br/>")

            print(type(dynamic_html_content))
            return render_template('display.html', result=dynamic_html_content)
        except Exception as e:
            import traceback
            print(f"Exception: {str(e)}")
            traceback.print_exc()
            return render_template('index2.html', status=500, res="Internal Server Error")

    return render_template('index2.html')

if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)
