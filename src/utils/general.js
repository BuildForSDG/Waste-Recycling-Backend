/* eslint-disable import/prefer-default-export */
export const filterModel = async (Model, value) => {
  const filted = await Model.filter((object) => object.status === value);

  return filted;
};
