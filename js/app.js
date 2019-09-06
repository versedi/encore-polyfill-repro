const basicObject = {
    message: 'Basic'
};

const targetObject = {};

targetObject.assign(basicObject);


export default async function app() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('October');
        }, 1000);
    });
}