<!--
  -
  -   OSIS stands for Open Student Information System. It's an application
  -   designed to manage the core business of higher education institutions,
  -   such as universities, faculties, institutes and professional schools.
  -   The core business involves the administration of students, teachers,
  -   courses, programs and so on.
  -
  -   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
  -
  -   This program is free software: you can redistribute it and/or modify
  -   it under the terms of the GNU General Public License as published by
  -   the Free Software Foundation, either version 3 of the License, or
  -   (at your option) any later version.
  -
  -   This program is distributed in the hope that it will be useful,
  -   but WITHOUT ANY WARRANTY; without even the implied warranty of
  -   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  -   GNU General Public License for more details.
  -
  -   A copy of this license - GNU General Public License - is available
  -   at the root of the source code of this program.  If not,
  -   see http://www.gnu.org/licenses/.
  -
  -->
<template>
  <div class="history-viewer">
    <div
        v-if="modes.length > 1"
        class="btn-group"
        data-toggle="buttons"
    >
      <template v-for="buttonMode in modes">
        <label
            v-if="buttonMode === 'table'"
            :key="buttonMode"
            class="btn btn-default"
            :class="{active: mode === 'Table'}"
            @click="mode = 'Table'"
        >
          <input
              type="radio"
              name="mode"
          >
          <span class="fa fa-table" />
        </label>
        <label
            v-else-if="buttonMode === 'vertical'"
            :key="buttonMode"
            class="btn btn-default"
            :class="{active: mode === 'Timeline' && horizontal === false}"
            @click="mode = 'Timeline'; horizontal = false;"
        >
          <input
              type="radio"
              name="mode"
          >
          <span class="fas fa-ellipsis-v" />
        </label>
        <label
            v-else-if="buttonMode === 'horizontal'"
            :key="buttonMode"
            class="btn btn-default"
            :class="{active: mode === 'Timeline' && horizontal === true}"
            @click="mode = 'Timeline'; horizontal = true;"
        >
          <input
              type="radio"
              name="mode"
          >
          <span class="fa fa-ellipsis-h" />
        </label>
      </template>
    </div>
    <div class="viewport">
      <span
          v-if="loading"
          class="spinner"
      />
      <span
          v-else-if="error"
          class="text-danger"
      >
        {{ error }}
      </span>
      <component
          :is="mode"
          v-else
          :entries="entries"
          :horizontal="horizontal"
          :on-item-render="mode === 'Table' ? onItemRenderTable : (horizontal ? onItemRenderHorizontalTimeline : onItemRenderVerticalTimeline)"
          :on-headers-render="onHeadersRenderTable"
          :on-history-empty="onHeadersRenderTable"
      />
    </div>
  </div>
</template>

<script>
import Table from './components/Table';
import Timeline from './components/Timeline';

export default {
  name: 'HistoryViewer',
  components: {
    Table,
    Timeline,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      default: '',
    },
    modes: {
      type: Array,
      default: () => ['table', 'vertical', 'horizontal'],
    },
    defaultMode: {
      type: String,
      default: 'table',
    },
    onItemRenderTable: {
      type: Function,
      default: null,
    },
    onHeadersRenderTable: {
      type: Function,
      default: null,
    },
    onItemRenderHorizontalTimeline: {
      type: Function,
      default: null,
    },
    onItemRenderVerticalTimeline: {
      type: Function,
      default: null,
    },
    onHistoryEmptyRender: {
      type: Function,
      default: null,
    },
  },
  data () {
    let defaultMode = this.defaultMode;
    if (!this.modes.includes(this.defaultMode)) {
      defaultMode = this.modes[0];
    }
    return {
      mode: defaultMode === 'table' ? 'Table' : 'Timeline',
      horizontal: defaultMode === 'horizontal',
      entries: [],
      error: '',
      loading: true,
    };
  },
  async mounted () {
    try {
      const response = await fetch(`${this.url}${this.tags ? '?tags=' + this.tags : ''}`);
      if (response.status === 200) {
        this.entries = await response.json();
      } else {
        this.error = response.statusText;
      }
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  },
};
</script>

<style>
.history-viewer .viewport {
  margin-top: 1em;
  overflow-x: scroll;
}

.history-viewer .spinner {
  display: block;
  margin: 0 auto;
  border: 3px solid #286090;
  border-top-color: transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1.5s linear infinite;
}
</style>
