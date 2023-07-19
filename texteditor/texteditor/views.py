from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def english(request):
    return render(request, 'english.html')

def nepali(request):
    return render(request, 'nepali.html')

def text_in_image(request):
    return render(request, 'text_in_image.html')
