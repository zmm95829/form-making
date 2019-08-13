/**
 * 获取model
 * @param {*} list 数据数组
 */
export function getFormModel(list) {
  const model = {};
  list.map(v => v.model).forEach((v, index) => {
    model[v] = list[index].defaultValue
  });
  return model;
}
