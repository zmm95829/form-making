<template>
  <!-- <div :class="{'item-container': true, 'active': selectItem && item && selectItem.id === item.id}"> -->
    <el-form-item :label="item.label" :class="{'item-container': true, 'active': selectItem && item && selectItem.id === item.id}" style="margin-bottom:2px;"  @click.native.stop="handleSelectItem">
      <div class="item-view">
      <template v-if="item.type === 'input'">
        <el-input
          v-model="item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :disabled="item.options.disabled"
        />
      </template>
      <template v-else-if="item.type === 'textarea'">
        <el-input
          v-model="item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :disabled="item.options.disabled"
          :autosize="{ minRows: item.options.minRows }"
          type="textarea"
        />
      </template>
      <template v-if="item.type == 'radio'">
        <el-radio-group
          v-model="showModel"
          :style="{width: item.options.width}"
          :disabled="item.options.disabled"
        >
          <el-radio
            :style="{display: item.options.inline ? 'inline-block' : 'block'}"
            :label="itemSub.value"
            v-for="(itemSub, index) in (item.options.remote ? item.options.remoteOptions : item.options.options)"
            :key="index"
          >
            <template v-if="item.options.remote">{{itemSub.label}}</template>
            <template v-else>{{ itemSub.label }}</template>
          </el-radio>
        </el-radio-group>
      </template>

      <template v-if="item.type == 'checkbox'">
        <el-checkbox-group
          v-model="showModel"
          :style="{width: item.options.width}"
          :disabled="item.options.disabled"
        >
          <el-checkbox
            :style="{display: item.options.inline ? 'inline-block' : 'block'}"
            :label="itemSub.value"
            v-for="(itemSub, index) in (item.options.remote ? item.options.remoteOptions : item.options.options)"
            :key="index"
          >
            <template v-if="item.options.remote">{{itemSub.label}}</template>
            <template v-else>{{ itemSub.label }}</template>
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-if="item.type == 'select'">
        <el-select v-model="showModel" :placeholder="item.options.placeholder" >
          <el-option
            v-for="(itemSub, index) in (item.options.remote ? item.options.remoteOptions : item.options.options)"
            :key="index"
            :label="itemSub.label"
            :value="itemSub.value"
          />
        </el-select>
      </template>
      <template v-if="item.type === 'date'">
        <el-date-picker
          v-model="showModel"
          :type="item.options.type"
          :format="item.options.format"
          :value-format="item.options.format"
          :placeholder="item.options.placeholder"/>
      </template>
      <template v-if="item.type === 'dialog'">
        <el-input
          v-model="item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :disabled="true"
          :class="item.subClass"
        />
        <el-button
          type="primary"
          style="margin-left:2px"
          icon="el-icon-more"
          circle
          size="mini"
        />
      </template>
      <template v-if="item.type === 'span_readonly'">
        <span :class="item.subClass">{{ item.options.defaultValue }}</span>
      </template>
      </div>
    <div v-if="selectItem && item && selectItem.id === item.id" class="item-view-action">
      <i class="iconfont icon-clone" title="复制" @click="handleClone"></i>
      <i class="iconfont icon-delete" title="删除" @click="handleDelete"></i>
    </div>
    <div v-if="selectItem && item && selectItem.id === item.id" class="item-view-drag">
      <i class="iconfont icon-drag item-drag"></i>
    </div>
    </el-form-item>
</template>
<script>
import { merge, cloneDeep } from "lodash";

export default {
  name: "FormViewItem",
  props: ["data", "select", "item", "index"],
  data: function() {
    return {
      selectItem: this.select,
      showModel: ""
    }
  },
  mounted() {
  },
  watch: {
    select: {
      handler: function() {
        this.selectItem = this.select;
      },
      deep: true
    },
    selectItem: {
      handler: function() {
        if (this.selectItem.id !== this.select.id) {
          this.$emit("update:select", this.selectItem);
        }
      },
      deep: true
    }
  },
  methods: {
    handleSelectItem: function() {
      this.selectItem = this.data[this.index];
    },
    handleDelete: function() {
      this.data.splice(this.index, 1);
      if (this.index !== 0) {
        this.$emit("update:select", this.data[this.index - 1]);
      } else if (this.data.length > 0) {
        this.$emit("update:select", this.data[this.index]);
      } else {
        this.$emit("update:select", {});
      }
    },
    handleClone: function() {
      const id = Date.parse(new Date());
      this.data.splice(this.index + 1, 0,
        merge(cloneDeep(this.data[this.index]), {
          id,
          model: this.data[this.index].type + "_key_" + id
        }));
      this.$emit("update:select", this.data[this.index + 1]);
    }
  }
};
</script>
<style>
.active {
  outline: 2px solid #409eff;
  /* border: 2px solid #409eff; */
  outline-offset: -1px;
}
.item-view{
  padding-bottom: 18px;
}
.item-view div, .item-view span {
  pointer-events: none;
}
.item-view-drag {
  position: absolute;
  left: -2px;
  top: -42px;
  height: 28px;
  line-height: 28px;
  background-color: #409eff;
}

.item-view-drag i {
  font-size: 16px;
  color: #fff;
  margin: 0 5px;
  cursor: move;
}
.item-container {
  border: 1px dashed #c2c2c3;
  position: relative;
  margin-bottom: 2px;
  background-color: #fafafa;
}
.item-container:hover {
  background-color: #f3f6fc;
  border: 1px solid #7cbcfe;
}
.item-view-action {
  /* margin-top: 28px; */
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #409eff;
  width: 40px;
  height: 25px;
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
}
.item-view-action i {
  cursor: pointer;
  font-size: 20px;
  font-weight: 400px;
}
</style>
