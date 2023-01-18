from django.db import models
from common.models import CommonModel

# Create your models here.


class ChattingRoom(CommonModel):
    """Room model definition"""

    users = models.ManyToManyField(
        "users.User",
    )

    def __str__(self) -> str:
        return "Chatting Room."


class Message(CommonModel):
    """message model definition"""

    text = models.TextField()
    users = models.ForeignKey(
        "users.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    room = models.ForeignKey(
        "direct_messages.ChattingRoom",
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return f"{self.users} says : {self.text}"
