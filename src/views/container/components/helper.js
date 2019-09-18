import { merge, cloneDeep, get } from "lodash";
import { getPath } from "@/utils/helper";
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
  newItem.page.pid = item.id;
  item.columns[index].list.splice(newIndex, 1, newItem);
  oldItem.columns[index] = merge({}, JSON.parse(JSON.stringify(item.columns[index])));
  store.commit("SET_SELECT", oldItem.columns[index].list[newIndex]);
};
export function handleMoveAdd(arr, val, position, pid) {
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
  newItem.page.pid = pid;
  arr.splice(newIndex, 1, newItem);
  store.commit("SET_SELECT", arr[newIndex]);
};
export function handleDelete(arr, index) {
  console.log("sdfsdf");
  if (index === arr.length - 1 && index !== 0) {
    console.log("last", arr[index - 1])
    store.commit("SET_SELECT", arr[index - 1]);
  } else if (arr.length > 1) {
    store.commit("SET_SELECT", arr[index + 1]);
  } else {
    const allPath = getPath(store.getters.system_data.list, "", true);
    const selectedPath = (allPath[arr[index].page.pid] && allPath[arr[index].page.pid].split("=")[0]) || "";
    const selectedItem = get(store.getters.system_data, selectedPath);
    store.commit("SET_SELECT", selectedItem || {});
  }
  arr.splice(index, 1);
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

/**
 * 设置选中的对象
 * @param {*} item 选中的对象
 */
export function handleSelectItem(item) {
  store.commit("SET_SELECT", item);
}
