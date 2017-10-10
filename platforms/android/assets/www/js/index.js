$( document ).ready(function() {
   console.log("ready");
   $("#pushNotification").click(function(event) {
      event.preventDefault();
      var ids = {
         "browser": [],
         "mobile": [],
      }



      $.get( 'https://api.mlab.com/api/1/databases/push-notification-registrations/collections/registrations?apiKey=Y9MYB5bt3fAyPmJ99eXfiRIJGZK9N-hz&q={"platform":"browser"}', function( data ) {
         console.log(data);
         for (var i = 0; i < data.length; i++) {
            ids.browser.push(data[i]._id);
            console.log("BROWSER PUSHING: " + data[i]._id);
         }
         var notification = initNotification();
         notification.registration_ids = ids.browser;
         notification.notification.click_action = "https://notifications-b01a3.firebaseapp.com/";
         notification.notification.icon = "https://notifications-b01a3.firebaseapp.com/assets/images/hackpsulogo.png";
         if (notification.registration_ids.length > 0) {
            console.log("pushing browser notifications");
            $.ajax({
             url: 'https://fcm.googleapis.com/fcm/send',
             type: "POST",
             processData : false,
             beforeSend: function (xhr) {
               xhr.setRequestHeader('Content-Type', 'application/json');
               xhr.setRequestHeader('Authorization', 'key=AAAAWbufXws:APA91bHfXsEZoJ7x4Zqe9qctxnL_73gknZfmznmP7f666KwkULCZ0yrTcueBVPWtZbfNTzK0y9kGWQy4M7h6hw6AESf6TGlgO2YVkJEj-HUDD1GksNtZsJ0mzeroaEodL8wq8oX__luN');
             },
             data: JSON.stringify(notification),
             success: function () {
               console.log("Browser Success");
             },
             error: function(error) {
               console.log(error);
             }
           });
         }

      });
      $.get( 'https://api.mlab.com/api/1/databases/push-notification-registrations/collections/registrations?apiKey=Y9MYB5bt3fAyPmJ99eXfiRIJGZK9N-hz&q={"platform":"Android"}', function( data ) {
         console.log(data);
         for (var i = 0; i < data.length; i++) {
            ids.mobile.push(data[i]._id);
            console.log("MOBILE PUSHING: " + data[i]._id);
         }
         var notification = initNotification();
         notification.registration_ids = ids.mobile;
         notification.notification.click_action = "FCM_PLUGIN_ACTIVITY";
         if (notification.registration_ids.length > 0) {
            console.log("pushing mobile notifications");
            $.ajax({
             url: 'https://fcm.googleapis.com/fcm/send',
             type: "POST",
             processData : false,
             beforeSend: function (xhr) {
               xhr.setRequestHeader('Content-Type', 'application/json');
               xhr.setRequestHeader('Authorization', 'key=AAAAWbufXws:APA91bHfXsEZoJ7x4Zqe9qctxnL_73gknZfmznmP7f666KwkULCZ0yrTcueBVPWtZbfNTzK0y9kGWQy4M7h6hw6AESf6TGlgO2YVkJEj-HUDD1GksNtZsJ0mzeroaEodL8wq8oX__luN');
             },
             data: JSON.stringify(notification),
             success: function () {
               console.log("Mobile Success");
             },
             error: function(error) {
               console.log(error);
             }
           });
            //postNotification(notification);
         }
      });
   });

   function initNotification() {
         var notification = { "notification": {
             "title": $("#titleInput").val(),
             "body": $("#bodyInput").val(),
             "sound":"default",
             "click_action" : null,
             "icon": null
           }, 
           "priority": "high",
           "data": {
             "title": $("#titleInput").val(),
             "body": $("#bodyInput").val()
           },

            "registration_ids" : null
         };
         return notification;
      }
   
});