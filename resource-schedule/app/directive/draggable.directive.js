angular.module('MyApp')

.directive('itemsDrag', [
	function() {
		return {
			link : function(scope, element, attrs) {
				
				var applyAttributeData = function() {
					element.data('event', {
						title: attrs.eventTitle,
						id: attrs.eventId,
						stick: true
					});

					element.draggable({
						revert: true,
						revertDuration: 0
					});	
				}
				
				applyAttributeData();
				
				attrs.$observe('eventTitle', function(value) {
					applyAttributeData();
				});
			}
		}
	}]);