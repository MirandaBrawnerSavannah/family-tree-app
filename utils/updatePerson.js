import addPerson from './addPerson';
import { removeOnePersonFromTree } from './removeFromTree';

const updatePerson = ({ person, data }) => {
  const listWithoutPerson = removeOnePersonFromTree({ personId: person.id, data });
  return addPerson({ newPerson: person, data: listWithoutPerson });
};
export default updatePerson;
