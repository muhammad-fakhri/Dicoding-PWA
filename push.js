const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNyb8SYHYTaRBXDpKvqb8GrYpMkOcT5XyFdivoWIjTrcrhqaCAI2lyOMILxKTiEPDDV93jH65pGPSmQLELXBMXM",
    "privateKey": "-sE2RPPPfN9u17sGWukxMtUJLXFpGlJ40DrbTIJNbnQ"
};

webPush.setVapidDetails(
    'mailto:admin@muhammadfakhri.my.id',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cH9sYkzRdAk:APA91bGNGZFxnY33CA6HlkXCp5EDLrmZuHqmwv6MloWcY1QXqyWLu4MkiaVbjvIldq4lfnFeTkxEy6ozponx_ItrWZ_X7YN6d_jT3ml2KSJCZ7wLX0Y5nE9VSoHF3x7C7taVVBHUTKYh",
    "keys": {
        "p256dh": "BEhye9O85wtEN3WG8s6rEKLUd6APJdLcLuq5aOv1lyj5NYAid/1/5VQ1Kf3EOTELitzd+i4EQIKPoytwVkNVCic=",
        "auth": "P0CpnZRdUowp4WErYPsmWg=="
    }
};
const payload = 'Hello! This is a push notification from Vanir!';

const options = {
    gcmAPIKey: '107891490415',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);