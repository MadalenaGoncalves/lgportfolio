app.directive('projectForm',function(){
  return {
    scope: {
      // item: '=set',
      // onClick: '&'
    },
    replace: true,
    controller: function () {},
    controllerAs: 'ctrl',
    bindToController: true,
    restrict: 'AE',
    template: '/partials/edit-project'
  }
});