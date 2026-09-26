import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

def send_verification_email(recipient_email, otp):
    """Send the 6-digit email verification OTP."""
    sender_email = os.getenv("MAIL_USERNAME")
    sender_password = os.getenv("MAIL_PASSWORD")

    message = EmailMessage()
    message["Subject"] = "TaskFlow - Verify your email"
    message["From"] = sender_email
    message["To"] = recipient_email

    message.set_content(f"""
Hello,

Your TaskFlow verification code is:

{otp}

This code will expire in 5 minutes.

If you did not create a TaskFlow account, you can ignore this email.

Regards,
TaskFlow
""")

    # Connect to Gmail SMTP and send the email.
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)
        
def send_password_reset_email(recipient_email, reset_link):
    """Send the password reset link to the user."""
    sender_email = os.getenv("MAIL_USERNAME")
    sender_password = os.getenv("MAIL_PASSWORD")

    message = EmailMessage()
    message["Subject"] = "TaskFlow - Reset your password"
    message["From"] = sender_email
    message["To"] = recipient_email

    message.set_content(f"""
Hello,

We received a request to reset your TaskFlow password.

Click the link below to create a new password:

{reset_link}

This link will expire in 30 minutes and can only be used once.

If you did not request a password reset, you can safely ignore this email.

Regards,
TaskFlow
""")

    # Connect to Gmail SMTP and send the reset email.
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)