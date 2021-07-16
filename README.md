<p align="center">
 <img width="20%" height="20%" src="./logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
[![ngneat-lib](https://img.shields.io/badge/made%20with-%40ngneat%2Flib-ad1fe3?logo=angular)](https://github.com/ngneat/lib)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm version](https://img.shields.io/npm/v/ngx-localstorage.svg)](https://www.npmjs.com/package/ngx-localstorage)

# ngx-localstorage 

An Angular wrapper for local storage access.

Feel free to take a look at the [DEMO](https://bohoffi.github.io/ngx-localstorage/).

## Features

- ✅ Handling access (read/write) to `localstorage` and `sessionstorage`
- ✅ Service abstraction
- ✅ Configurable
- ✅ Custom serialization

## Table of Contents

* [Compatibility](#compatibility)
* [Installation](#installation)
* [Usage](#usage)
  * [Serialization](#serialization)
* [API](#api)

## Compatibility

Angular      | ngx-localstorage 
 ----------- | -------------------
 12          | 12.x              
 < 12        | 3.x              

## Installation

### NPM

`npm install ngx-localstorage --save`

### Yarn

`yarn add ngx-localstorage`

### Schematics

`ng add ngx-localstorage`

## Usage

#### 1. Import `NgxLocalStorageModule`

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxLocalStorageModule} from 'ngx-localstorage';

@NgModule({
    imports: [
        BrowserModule,
        NgxLocalStorageModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

##### Configuration (`NgxLocalStorageModule.forRoot(moduleConfig)`)

* __prefix__
  * Type: `string?`
  * Determines the key prefix.
  * Default: __null__
* __allowNull__
  * Type: `boolean`
  * Determines if _null | 'null'_ values should be stored.
  * Default: __true__
* __storage__
  * Type: `Storage`
  * Determines the storage type.
  * Default:  __localStorage__
* __delimiter__
  * Type: `string?`
  * Determines the delimiter in between prefix and key.
  * Default: __underscore('_')__

##### Submodule support (`NgxLocalStorageModule.forChild()`)

### Serialization

#### Default serialization

The library utilizes the `JSON.stringify()/JSON.parse()` mechanics to pass values (of any type) to and from localstorage per default.
If you wish you can override that behaviour by injecting your own custom serializer (app wide) or pass one per stoage call.

##### App wide serializer
Inject your custom serializer implentation using the provided injection token:

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxLocalStorageModule, NGX_LOCAL_STORAGE_SERIALIZER} from 'ngx-localstorage';

@NgModule({
    imports: [
        BrowserModule,
        NgxLocalStorageModule.forRoot()
    ],
    bootstrap: [AppComponent],
    providers: [
      {
        provide: NGX_LOCAL_STORAGE_SERIALIZER,
        useClass: <custom serializer implementing StorageSerializer>
      }
    ]
})
export class AppModule { }
```

##### Per call serializer
Every `set()/get` call on `LocalstorageService` and `PromisableService` now supports to pass an optional (de)seriaizer. If none is provided the app wide (or default) one is used.
  
## API

### LocalStorageService

#### Methods

- `asPromisable(): PromisableService`: provide the storage operations wrapped in a Promise
- `count(): number`: Gets the number of entries in the applications local storage.
- `getKey(index: number): string | null`: Returns the nth (defined by the index parameter) key in the storage. The order of keys is user-agent defined, so you should not rely on it.
- `set(key: string, value: string, prefixOrSerilizer?: string | StorageSerializer): void`: Adds tha value with the given key or updates an existing entry using either the provided or default serializer (check method overloads).
- `get(key: string, prefixOrSerilizer?: string | StorageSerializer): string | null`: Gets the entry specified by the given key or null using either the provided or default serializer (check method overloads).
- `remove(key: string, prefix?: string): void`: Removes the entry specified by the given key.
- `clear(): void`: Clears all entries of the applications local storage.

_Promise-based_

- `count(): Promise<number>`: Gets the number of entries in the applications local storage.
- `getKey(index: number): Promise<string | null>`: Returns the nth (defined by the index parameter) key in the storage. The order of keys is user-agent defined, so you should not rely on it.
- `set(key: string, value: string, prefixOrSerilizer?: string | StorageSerializer): Promise<boolean>`: Adds tha value with the given key or updates an existing entry using either the provided or default serializer (check method overloads).
- `get(key: string, prefixOrSerilizer?: string | StorageSerializer): Promise<string | null>`: Gets the entry specified by the given key or null using either the provided or default serializer (check method overloads).
- `remove(key: string, prefix?: string): Promise<boolean>`: Removes the entry specified by the given key.
- `clear(): Promise<boolean>`: Clears all entries of the applications local storage.

##### Example

```ts
import {LocalStorageService} from 'ngx-localstorage';

@Component({
  selector: 'app-storage-access',
  template: './storage-access.component.html'
})
export class StorageAccessComponent implements OnInit {

  constructor(private _storageService: LocalStorageService) {
  }
  
  ngOnInit(): void {
    console.log('Entries count: ', this._storageService.count())
  
    // Pomise-based
    this._storageService.asPromisable().count()
      .then(count => console.log('Entries count: ', count))
      .catch(error => console.error(error));
  }
}
```
### StorageEventService

#### Properties

- `stream(): Observable<StorageEvent>`: Gets a stream of StorageEvent.

### ngxLocalStorage (Directive)

#### Properties

- `lsKey` (`string`): Determines the key (combined with the prefix) which is used to store the value. If omitted the `id` or the `name`attribute will be used.
- `lsPrefix` (`string`): Determines the prefix (combined with the key) to store the value.
- `lsEvent` (`string`): Determines the event to hook up to store the value.
- `lsDebounce` (`number`): Determines the 'delay' when processing the event.
- `lsInitFromStorage` (`boolean`): Determines if the stored value (if there is one) should be set automatically on application load. __Default__: `false`
- `lsValuePath` (`string[] | string`): Determines the path to access the value to store.
- `lsFalsyTransformer` (`() => any`): Used to transform falsy values received from storage.

#### Methods/Events

- `lsStoredValue`: Used to register an event listener when a value gets stored.

##### Example

Capture the value of an input element when the user is typing and loads the stored value on startup:
```html
<p>
  <label for="text">Text:</label>
  <input id="text" type="text" ngxLocalStorage lsEvent="input" lsDebounce="500" lsInitFromStorage="true"
    (storedValue)="logStoredValue($event)">
</p>
```

Defining the `valuePath` for a checkbox input:
```html
<p>
  <input type="checkbox" id="cbox1" ngxLocalStorage lsEvent="change" [lsValuePath]="['checked']">
  <label for="cbox1">Checkbox</label>
</p>
```

### ngxLocalStorage (Property-Decorator)

#### Parameters

- `key?: string`: specify a key to store the value; if omitted the property name will be used
- `prefix?: string`: specify a prefix to store the value; if omitted the modules default prefix will be used
- `storage?: Storage`: specifies the storage type; falls back to localstorage if omitted
- `delimiter?: string`: specifies the delimiter; falls back to '_' if omitted
- `nullTransformer?: () => any`: Used to transform null values received from storage.

##### Example

```ts
import {ngxLocalStorage} from 'ngx-localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  @ngxLocalStorage()
  code: any;
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
