export default store => next => action => {
  if(!action.callAPI) return next(action);
  fetch(action.callAPI)
      .then(res => res.json())
      .then(response => next({...action, response}));
};