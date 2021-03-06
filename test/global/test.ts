// Example: Using ko.mapping
(function() {
    interface ViewModel {
        serverTime: ko.Observable<string>;
        numUsers: ko.Observable<number>;
    }
    
    const data = {
        serverTime: '2010-01-07',
        numUsers: 3
    };
    
    const viewModel = ko.mapping.fromJS<ViewModel>(data);
    
    // Every time data is received from the server:
    ko.mapping.fromJS(data, viewModel);
    
    const unmapped = ko.mapping.toJS(viewModel);
})();

// Example: Advanced usage
(function() {
    interface ViewModel {
        name: ko.Observable<string>;
        children: ko.ObservableArray<MyChildModel>;
    }
    
    class MyChildModel {
        id: ko.Observable<number>;
        name: ko.Observable<string>;
        nameLength: ko.Computed<number>;
        
        constructor(data) {
            ko.mapping.fromJS(data, {}, this);
            this.nameLength = ko.pureComputed(() => this.name().length, this);
        }
    }
    
    const data = {
        name: 'Scott',
        children: [
            { id : 1, name : 'Alice' }
        ]
    };
    
    const options: ko.mapping.Options = {
        ignore: ["propertyToIgnore", "alsoIgnoreThis"],
        include: ["propertyToInclude", "alsoIncludeThis"],
        copy: ["propertyToCopy"],
        observe: ["propertyToObserve"],
        
        "name": {
            update: options => options.data + " foo!"
        },
        "children": {
            key: data => ko.utils.unwrapObservable(data.id),
            create: options => new MyChildModel(options.data)
        }
    };
    
    const viewModel = ko.mapping.fromJS<ViewModel>(data, options);
    
    // Every time data is received from the server:
    ko.mapping.fromJS(data, options, viewModel);
    
    const unmapped = ko.mapping.toJS(viewModel);
})();


// Example: Mapped observable array
(function() {
    interface ViewModel {
        id: ko.Observable<number>;
    }
    
    const obj = [
        { id : 1 },
        { id : 2 }
    ];
    
    const options: ko.mapping.Options = {
        key: item => ko.unwrap(item.id)
    };
    
    const result = ko.mapping.fromJS<ViewModel>(obj, options);
    
    result.mappedRemove({ id : 2 });
    
    const newItem = result.mappedCreate({ id : 3 });
})();