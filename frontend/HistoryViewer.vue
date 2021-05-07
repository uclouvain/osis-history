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
    <div class="btn-group" data-toggle="buttons">
      <label class="btn btn-default active" @click="mode = 'Table'">
        <input type="radio" name="mode">
        <span class="fa fa-table"></span>
      </label>
      <label class="btn btn-default" @click="mode = 'Timeline'; horizontal = false;">
        <input type="radio" name="mode">
        <span class="fas fa-ellipsis-v"></span>
      </label>
      <label class="btn btn-default" @click="mode = 'Timeline'; horizontal = true;">
        <input type="radio" name="mode">
        <span class="fa fa-ellipsis-h"></span>
      </label>
    </div>
    <div class="viewport">
      <component :is="mode" :entries="entries" :horizontal="horizontal"/>
    </div>
  </div>
</template>

<script>
import Table from "./components/Table";
import Timeline from "./components/Timeline";

export default {
  name: 'HistoryViewer',
  props: {
    url: String
  },
  components: {
    Table,
    Timeline,
  },
  data() {
    return {
      mode: 'Table',
      horizontal: false,
      entries: [],
    }
  },
  async mounted() {
    const response = await fetch(this.url);
    this.entries = await response.json();
  }
};
</script>

<style>
.history-viewer .viewport {
  margin-top: 1em;
  overflow-x: scroll;
}
</style>
