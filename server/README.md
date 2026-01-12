# Node Mailer Server

## Contact Form:
### Sends the following to the front end:

### Requires the following from the front end:


### ENV needs the following:
- CONTACT_EMAIL_USER
- CONTACT_EMAIL_PASS
- EMAIL_PORT
- EMAIL_HOST
- SERVER_PORT
- SITE_LINK
- FRONTEND_DEV_ORIGIN
- FRONTEND_PRO_ORIGIN
- NODE_ENV

### Update the following files:
- mail.controller.js - update the mailOptions html section for the email body
- htaccess - set to client site