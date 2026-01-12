# Front end for common forms

## Contact form:
### Sends the following to the server:
- subject
- message
- contact
- userName
- captchaAnswer
- captchaId
- website (this is a hidden component no actual user imput)

### Requires the following from the server:
- Captcha

### ENV needs the following:
VITE_SUPPORT_EMAIL
VITE_EMAIL_URL