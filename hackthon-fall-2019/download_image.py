import urllib.request


class download_image:

    def download(self, receipt_name):
        urllib.request.urlretrieve("https://ucarecdn.com/" + receipt_name + "/", "static/local-filename.jpg")
