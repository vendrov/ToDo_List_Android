var taskName;
angular.module('ionicApp', ['ionic', 'LocalStorageModule'])
        .controller('MyCtrl', function($scope, $ionicModal, localStorageService) {
            $scope.items = [];
            var notificationDate = new Date();
            
            $ionicModal.fromTemplateUrl('test1.html', function(modal)
            {
                $scope.modal = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true

            });
            
            $ionicModal.fromTemplateUrl('edit.html', function(modal)
            {
                $scope.editModal = modal;
            }, {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true

            });

            $scope.onItemDelete = function(item) {
                window.plugin.notification.local.cancel(item.name);
                var itemIndex = $scope.items.indexOf(item);
                $scope.items.splice(itemIndex, 1);
                localStorageService.add("myItems", $scope.items);
            };

            $scope.editItem = function(item) {
                // Reset form
                $scope.EditName = item.name;
                $scope.time = item.time;
                $scope.date = item.date;
                $scope.onItemDelete(item);
                $scope.editModal.show();
                $scope.apply();
                
            };
            
            $scope.editTask = function() {
                $scope.editmyTask();
                $scope.editModal.hide();
                $scope.apply();
                //alert($scope.items[$scope.items.lenght -1].name);
            };
            
            $scope.addItem = function() {
                $scope.modal.show();

                // Reset form
                $scope.time = "";
                $scope.date = "";
                $scope.apply();
            };

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            $scope.createNewTask = function() {
                var newItem = {
                    name: this.Myname,
                    date: this.date,
                    time: this.time
                };
                var tempArr = new Array();

                if (getItemsStorage()) {
                    tempArr = getItemsStorage();
                }
                
                $scope.items.push(newItem);
                tempArr.push(newItem);
                localStorageService.add("myItems", tempArr);
                
                window.plugin.notification.local.add({
                    id: newItem.name, // A unique id of the notifiction
                    date: notificationDate, // This expects a date object
                    message: newItem.name, // The message that is displayed
                    title: newItem.name, // The title of the message
                    repeat: null, // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                    badge: null, // Displays number badge to notification
                    sound: null, // A sound to be played
                    json: null, // Data to be passed through the notification
                    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing: false, // Prevent clearing of notification (Android only)
                });
                this.Myname = "";
                $scope.closeModal();
                $scope.modal.remove();
            };
            
            $scope.editmyTask = function() {
                var newItem = {
                   // name: taskName,
                    name: this.EditName,
                    date: this.date,
                    time: this.time
                };
                var tempArr = new Array();

                if (getItemsStorage()) {
                    tempArr = getItemsStorage();
                }

                $scope.items.push(newItem);
                tempArr.push(newItem);
                localStorageService.add("myItems", tempArr);
                
                window.plugin.notification.local.add({
                    id: newItem.name, // A unique id of the notifiction
                    date: notificationDate, // This expects a date object
                    message: newItem.name, // The message that is displayed
                    title: newItem.name, // The title of the message
                    repeat: null, // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
                    badge: null, // Displays number badge to notification
                    sound: null, // A sound to be played
                    json: null, // Data to be passed through the notification
                    autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
                    ongoing: false, // Prevent clearing of notification (Android only)
                });
                this.EditName = "";
                $scope.closeModal();
            };

            $scope.onReload = function() {
                var tempArr = getItemsStorage();
                if (!tempArr) {
                    tempArr = [];
                }
                ;
                $scope.testme = tempArr.length;
                for (var i = 0; i < tempArr.length; i++)
                {
                    $scope.testme = 4;
                    $scope.items.push(tempArr[i]);
                }
            };

            var getItemsStorage = function()
            {
                return localStorageService.get("myItems");
            };

            //Be sure to cleanup the modal
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
            
            $scope.$on('$destroy', function() {
                $scope.editModal.remove();
            });

            $scope.onReload();

            $scope.getMyTime = function() {
                var options = {
                    date: new Date(),
                    mode: 'time'

                };

                datePicker.show(options, function(date) {
                    $scope.time = date.getHours() + ":" + date.getMinutes();
                    notificationDate.setHours(date.getHours());
                    notificationDate.setMinutes(date.getMinutes());
                    $scope.$apply();
                });

            };

            $scope.getMyDate = function() {
                var options = {
                    date: new Date(),
                    mode: 'date'
                };
                datePicker.show(options, function(date) {
                    $scope.date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
                    notificationDate.setDate(date.getDate());
                    notificationDate.setMonth(date.getMonth());
                    notificationDate.setFullYear(date.getFullYear());
                    $scope.$apply();
                });

            };
        });
