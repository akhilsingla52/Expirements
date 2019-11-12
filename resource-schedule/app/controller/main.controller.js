angular.module('MyApp')

  .controller("MainController", ['$scope', '$compile', 'localStorageService',
    function ($scope, $compile, localStorageService) {
      var vm = this;
      vm.selectedEvent = {};

      vm.eventSource = [{
        events: [
        ],
        color: 'blue',
        textColor: 'white'
      }];

      var events = localStorageService.get("events");
      if (events != undefined && events != null)
        vm.eventSource[0].events = events;

      vm.uiConfig = {
        calendar: {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay,listDay '
          },
          businessHours: true,
          timezone: 'UTC',
          droppable: true,
          editable: true,
          drop: onDrop,
          eventReceive: onEventReceive,
          eventResize: onEventResize,
          eventDrop: onEventDrop,
          eventRender: onEventRender,
          eventClick: onEventClick
        }
      };

      function onDrop(date) {
        console.log("Dropped on " + date.format());
      }

      function onEventDrop(event, delta, revertFunc) {
        console.log("onEventDrop");

        for (var i = 0; i < vm.eventSource[0].events.length; i++) {
          if (vm.eventSource[0].events[i].orginal_id == event.orginal_id) {
            vm.eventSource[0].events[i].start = moment(event.start).format("YYYY-MM-DD");
            vm.eventSource[0].events[i].end = moment(event.end).format("YYYY-MM-DD");
            break;
          }
        }
        localStorageService.set("events", vm.eventSource[0].events);

      };

      function onEventReceive(event) {
        console.log("onEventReceive");

        var selectEvent = {
          "event_id": event._id,
          "orginal_id": event.id,
          "title": event.title,
          "hours": 8,
          "start": moment(event.start).format("YYYY-MM-DD"),
          "id": event._id,
          "_id": event._id
        };

        $('#calendar').fullCalendar('removeEvents', event._id);

        vm.eventSource[0].events.push(selectEvent);
        localStorageService.set("events", vm.eventSource[0].events);
      };

      function onEventRender(event, element) {
        // console.log("onEventRender");
      }

      function onEventClick(event, jsEvent, view) {
        console.log("onEventClick");
        console.log('Event: ' + event.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);

        angular.element('#modalTitle').html(event.title);
        vm.selectedEvent = event;
        angular.element('#eventHourModal').modal('toggle');
      }

      function onEventResize(event, delta, revertFunc) {
        for (var i = 0; i < vm.eventSource[0].events.length; i++) {
          if (vm.eventSource[0].events[i].orginal_id == event.orginal_id) {
            vm.eventSource[0].events[i].end = moment(event.end).format("YYYY-MM-DD");

            var d1 = new Date(vm.eventSource[0].events[i].start);
            var d2 = new Date(vm.eventSource[0].events[i].end);

            var timeDiff = d2.getTime() - d1.getTime();
            var DaysDiff = timeDiff / (1000 * 3600 * 24);

            vm.eventSource[0].events[i].hours = 8 * DaysDiff;
            break;
          }
        }
        localStorageService.set("events", vm.eventSource[0].events);
      }

      vm.updateHours = function () {
        for (var i = 0; i < vm.eventSource[0].events.length; i++) {
          if (vm.eventSource[0].events[i].orginal_id == vm.selectedEvent.orginal_id) {
            vm.eventSource[0].events[i].hours = vm.selectedEvent.hours;
            angular.element('#calendar').fullCalendar("updateEvent", vm.selectedEvent);
            break;
          }
        }
        localStorageService.set("events", vm.eventSource[0].events);

        angular.element('#eventHourModal').modal('toggle');
      }

      vm.removeEvent = function () {
        //angular.element('#calendar').fullCalendar("removeEvents", vm.selectedEvent.id);

        for (var i = 0; i < vm.eventSource[0].events.length; i++) {
          if (vm.eventSource[0].events[i].id == vm.selectedEvent.id) {
            vm.eventSource[0].events.splice(i, 1);
            break;
          }
        }
        localStorageService.set("events", vm.eventSource[0].events);
        angular.element('#eventHourModal').modal('toggle');
      }

      vm.deleteSchedules = function (orginal_id) {
        if (orginal_id == undefined)
          return;
        let events = [];

        for (var i = 0; i < vm.eventSource[0].events.length; i++) {
          if (vm.eventSource[0].events[i].orginal_id == orginal_id) {
            angular.element('#calendar').fullCalendar("removeEvents", vm.eventSource[0].events[i].id);
          } else {
            events.push(vm.eventSource[0].events[i]);
          }
        }
        //console.log(vm.eventSource);
        localStorageService.set("events", events);
      }
    }]);