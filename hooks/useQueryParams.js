import { useContext } from 'react';
import QueryParamsContext from '../components/QueryParamsContext';

function useQueryParams() {
  return useContext(QueryParamsContext);
}
export default useQueryParams;