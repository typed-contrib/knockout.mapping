// Type definitions for Knockout.Mapping 2.0
// Project: https://github.com/SteveSanderson/knockout.mapping
// Definitions by: Boris Yankov <https://github.com/borisyankov/>,
//                 Maxime LUCE <https://github.com/spatools/>
// Definitions: https://github.com/typed-contrib/knockout.mapping

import * as ko from "knockout";

declare module knockoutMapping {
    export interface Options {
        ignore?: string[];
        include?: string[];
        copy?: string[];
        mappedProperties?: string[];
        deferEvaluation?: boolean;
        create?: (options: CreateOptions) => void;
        update?: (options: UpdateOptions) => void;
        key?: (data: any) => any;
        
        [key: string]: string[] | boolean | Function | Options | undefined;
    }

    export interface CreateOptions {
        data: any;
        parent: any;
    }

    export interface UpdateOptions {
        data: any;
        parent: any;
        target: any;
        observable?: ko.Observable<any>;
    }
    
    export interface VisitModelOptions {
        visitedObjects?: any; 
        parentName?: string; 
        ignore?: string[]; 
        copy?: string[]; 
        include?: string[]; 
    }

    export function isMapped(viewModel: any): boolean;
    
    export function fromJS(jsObject: Object[]): any[];
    export function fromJS(jsObject: Object[], options: Options): any[];
    export function fromJS(jsObject: Object): any;
    export function fromJS(jsObject: Object, options: Options): any;
    
    export function fromJS<T>(jsObject: Object[]): ko.ObservableArray<T>;
    export function fromJS<T>(jsObject: Object[], target: ko.ObservableArray<T>): ko.ObservableArray<T>;
    export function fromJS<T>(jsObject: Object[], options: Options): ko.ObservableArray<T>;
    export function fromJS<T>(jsObject: Object[], inputOptions: Options, target: ko.ObservableArray<T>): ko.ObservableArray<T>;
    export function fromJS<T>(jsObject: Object): T;
    export function fromJS<T>(jsObject: Object, target: T): T;
    export function fromJS<T>(jsObject: Object, options: Options): T;
    export function fromJS<T>(jsObject: Object, inputOptions: Options, target: T): T;
    
    export function fromJSON(jsonString: string): any;
    export function fromJSON(jsonString: string, target: any): any;
    export function fromJSON(jsonString: string, options: Options): any;
    export function fromJSON(jsonString: string, inputOptions: Options, target: any): any;
    export function fromJSON<T>(jsonString: string): T;
    export function fromJSON<T>(jsonString: string, target: any): T;
    export function fromJSON<T>(jsonString: string, options: Options): T;
    export function fromJSON<T>(jsonString: string, inputOptions: Options, target: any): T;
    
    export function toJS(rootObject: any): any;
    export function toJS(rootObject: any, options: Options): any;
    export function toJS<T>(rootObject: any): T;
    export function toJS<T>(rootObject: any, options: Options): T;
    
    export function toJSON(rootObject: any): string;
    export function toJSON(rootObject: any, options: Options): string;
    
    export function defaultOptions(): Options;
    export function defaultOptions(options: Options): void;
    
    export function resetDefaultOptions(): void;
    
    export function getType(x: any): string;
    
    export function visitModel(rootObject: any, callback: (propertyValue: any, parentName: string) => any): any;
    export function visitModel(rootObject: any, callback: (propertyValue: any, parentName: string) => any, options: VisitModelOptions): any;
    export function visitModel<T>(rootObject: any, callback: (propertyValue: any, parentName: string) => any): T;
    export function visitModel<T>(rootObject: any, callback: (propertyValue: any, parentName: string) => any, options: VisitModelOptions): T;
}

declare module "knockout" {
    export interface ObservableArrayFunctions<T> {
        mappedCreate(item: T): T;
        mappedCreate(item: Object): T;

        mappedRemove(item: T): T[];
        mappedRemove(item: Object): T[];
        mappedRemove(removeFunction: (object: T) => boolean): T[];
        mappedRemove(removeFunction: (key: any) => boolean): T[];
        
        mappedRemoveAll(): T[];
        mappedRemoveAll(items: T[]): T[];
        mappedRemoveAll(item: Object[]): T[];

        mappedDestroy(item: T): void;
        mappedDestroy(destroyFunction: (object: T) => boolean): void;
        mappedDestroy(destroyFunction: (key: any) => boolean): void;
        mappedDestroy(item: Object): T;
        
        mappedDestroyAll(): void;
        mappedDestroyAll(items: T[]): void;
        mappedDestroyAll(item: Object[]): void;
    }
}

export = knockoutMapping;
