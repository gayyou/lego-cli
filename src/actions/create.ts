import {create} from "../services";

console.log('123123');
export default async function () {
  console.log('create');
  await create();
}
