// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAxPmUIarzur4UtDYrR-9Qq_jbQgUvH7Y4',
        authDomain: 'puzzles-a6dd7.firebaseapp.com',
        databaseURL: 'https://puzzles-a6dd7.firebaseio.com',
        projectId: 'puzzles-a6dd7',
        storageBucket: 'puzzles-a6dd7.appspot.com',
        messagingSenderId: '1087905123552',
        appId: '1:1087905123552:web:16d664df5fddeff8251485'
    },
    apiUrl: 'http://localhost:3200'
    // apiUrl: 'http://localhost:8080'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
