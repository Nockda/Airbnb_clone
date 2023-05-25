from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("me", views.Me.as_view()),
    path("", views.Users.as_view()),
    path("@<str:username>", views.PublicUser.as_view()),
    path("login", views.LogIn.as_view()),
    path("logout", views.Logout.as_view()),
    path("token-login", obtain_auth_token),
    path("change-password", views.ChangePassword.as_view()),
]