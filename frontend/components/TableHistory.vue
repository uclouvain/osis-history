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
  <table class="table table-striped">
    <thead v-if="!onHeadersRender">
      <tr>
        <th>{{ $t('date') }}</th>
        <th>{{ $t('message') }}</th>
        <th>{{ $t('author') }}</th>
      </tr>
    </thead>
    <thead
        v-else
        v-html="renderedHeaders"
    />

    <tbody v-if="entries.length && !onItemRender">
      <tr
          v-for="(entry, index) in entries"
          :key="index"
      >
        <td>{{ entry.created }}</td>
        <td :inner-html.prop="filterXssAndFormat(entry.message)" />
        <td>{{ entry.author }}</td>
      </tr>
    </tbody>
    <tbody
        v-else-if="entries.length && !!onItemRender"
        v-html="renderedRows"
    />
    <tbody
        v-else-if="!!onHistoryEmptyRender"
        v-html="renderedEmpty"
    />
    <tbody v-else>
      <tr>
        <td colspan="3">
          {{ $t('no_entry') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import type {Entry} from "../interfaces";
import {filterXssAndFormat} from "../utils";

export default defineComponent({
  name: 'TableHistory',
  props: {
    entries: {
      type: Array as PropType<Entry[]>,
      required: true,
    },
    onItemRender: {
      type: Function as PropType<(entry: Entry) => string>,
      default: null,
    },
    onHeadersRender: {
      type: Function as PropType<(entries: Entry[]) => string>,
      default: null,
    },
    onHistoryEmptyRender: {
      type: Function as PropType<(mode: string) => string>,
      default: null,
    },
  },
  data: function () {
    return {
      // Render dynamically the table headers and items
      renderedHeaders: this.onHeadersRender ? this.onHeadersRender(this.entries) : '',
      renderedRows: this.onItemRender ? this.entries.map(this.onItemRender).join('') : [],
      renderedEmpty: this.onHistoryEmptyRender ? this.onHistoryEmptyRender('table') : '',
    };
  },
  methods: {filterXssAndFormat},
});
</script>

<style>
.history-viewer .table {
  background-color: #fff;
}
</style>
