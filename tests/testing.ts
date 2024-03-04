import { Inflectors } from "en-inflectors";

const i = new Inflectors("celery rib").toPlural();

const str = JSON.stringify(i);

console.log(i);