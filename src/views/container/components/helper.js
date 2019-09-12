import { merge, cloneDeep } from "lodash";
import store from "@/store";

export function handleGridColAdd(event, oldItem, index) {
  const item = JSON.parse(JSON.stringify(oldItem));
  const newIndex = event.newIndex;
  const id = getId();
  const newItem = merge(cloneDeep(item.columns[index].list[newIndex]), {
    id
  }, {
    self: {
      model: item.columns[index].list[newIndex].type + "_key_" + id
    }
  });
  const position = item.page.position;
  newItem.page.position = position ? position + "." + newItem.type : newItem.type;
  item.columns[index].list.splice(newIndex, 1, newItem);
  oldItem.columns[index] = merge({}, JSON.parse(JSON.stringify(item.columns[index])));
  store.commit("SET_SELECT", oldItem.columns[index].list[newIndex]);
};
export function handleMoveAdd(arr, val, position) {
  const newIndex = val.newIndex;
  // 为拖拽到容器的元素添加唯一id
  const id = getId();
  const newItem = merge(cloneDeep(arr[newIndex]), {
    id
  }, {
    self: {
      model: arr[newIndex].type + "_key_" + id
    }
  });
  newItem.page.position = position ? position + "." + newItem.type : newItem.type;
  arr.splice(newIndex, 1, newItem);
  store.commit("SET_SELECT", arr[newIndex]);
};
export function handleDelete(arr, index) {
  arr.splice(index, 1);
  if (index !== 0) {
    store.commit("SET_SELECT", arr[index - 1]);
  } else if (arr.length > 0) {
    store.commit("SET_SELECT", arr[index]);
  } else {
    store.commit("SET_SELECT", {});
  }
}
export function handleClone(arr, index) {
  const id = Date.parse(new Date());
  arr.splice(index + 1, 0,
    merge(cloneDeep(arr[index]), {
      id
    },
    {
      self: {
        model: arr[index].type + "_key_" + id
      }
    }));
  store.commit("SET_SELECT", arr[index + 1]);
}
/**
 * 生成id，由当前时间戳和随机数组成
 * @param {*} max 随机数最大值
 * @param {*} min 随机数最小值
 */
function getId(max = 100, min = 10) {
  return Date.parse(new Date()) + String(Math.floor(Math.random() * (max - min + 1)) + min);
};
