import * as Sentry from '@sentry/browser/esm';


const dsn = '<YOUR_DSN_HERE>';
Sentry.init({
    dsn: dsn,
    maxBreadcrumbs: 50,
    debug: true,
    attachStacktrace: true,
});


const basicObject = {
    message: 'Basic'
};

var copy = Object.assign({}, basicObject);



export default async function app() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('October');
        }, 1000);
    });
}