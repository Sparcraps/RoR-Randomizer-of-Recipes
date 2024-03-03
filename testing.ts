import { Inflectors } from "en-inflectors";

const i = new Inflectors("rib of celery").toPlural();

const str = JSON.stringify(i);

console.log(i);