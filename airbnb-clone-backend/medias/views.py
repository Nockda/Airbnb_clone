import requests
from django.conf import settings
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK
from .models import Photo
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response


class PhotoDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(sefl, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise NotFound

    def delete(self, request, pk):
        photo = self.get_object(pk)
        if (photo.room and photo.room.owner != request.user) or (
            photo.experience and photo.experience.host != request.user
        ):
            raise PermissionDenied
        photo.delete()
        return Response(status=HTTP_200_OK)


class GetUploadURL(APIView):
    def post(self, request):
        url = f"https://api.cloudflare.com/client/v4/accounts/{settings.CF_ID}/images/v2/direct_upload"

        one_time_URL = requests.post(
            url, headers={"Authorization": f"Bearer {settings.CF_TOKEN}"}
        )
        one_time_URL = one_time_URL.json()
        result = one_time_URL.get("result")
        return Response({"uploadURL": result.get("uploadURL")})
