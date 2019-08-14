import { container, image, inspect } from './docker'

let containers = container.ls('-a');
containers.forEach(_container => _container["running"] = _container.isRunning())

console.log(containers);

let images = image.ls();
console.log(images);


const ids = containers.reduce((previous, current) => previous + `${current.id} `, '');
let status = inspect.inspectList('asdasdasdasd', true);
console.log(status);

