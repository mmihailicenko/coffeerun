(function (window) {
    'use strict';
    const FORM_SELECTOR = '[data-coffee-order="form"]';
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    const SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('nc-1701', remoteDS);
    window.myTruck = myTruck;
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR)

    formHandler.addSubmitHandler(function (data) {
        return myTruck.createOrder(data)
            .then(function () {
                    checkList.addRow(data);
                }
            );
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

    myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
