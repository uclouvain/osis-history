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
  <div>
    <ul
        v-if="entries.length"
        class="timeline"
        :class="{'timeline-horizontal': horizontal}"
    >
      <li v-for="(entry, index) in entries" :key="index" class="timeline-item">
        <div class="timeline-badge"></div>
        <div class="timeline-panel">
          <div class="timeline-heading">
            <h3 class="h4">
              <span class="glyphicon glyphicon-time"></span>
              {{ entry.created }}
              -
              <span class="glyphicon glyphicon-user"></span>
              {{ entry.author }}
            </h3>
          </div>
          <div class="timeline-body">
            <p>{{ entry.message_fr }}</p>
            <p>{{ entry.message_en }}</p>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>{{ $t('no_entry') }}</p>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    entries: Array,
    horizontal: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss">
/* From https://bootsnipp.com/snippets/a3BjR */
.timeline {
  list-style: none;
  padding: 20px;
  position: relative;

  &:before {
    top: 40px;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 3px;
    background-color: #999;
    margin-left: -1.5px;
  }

  .timeline-item {
    margin-bottom: 20px;
    position: relative;

    &:before,
    &:after {
      content: "";
      display: table;
    }

    &:after {
      clear: both;
    }

    .timeline-badge {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 32px;
      margin-left: -10px;
      background-color: #7c7c7c;
      border-radius: 50%;
    }

    .timeline-panel {
      position: relative;
      width: calc(100% - 25px);
      border: 1px solid #c0c0c0;
      background: #ffffff;
      border-radius: 2px;
      padding: 20px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
      float: right;

      &:before {
        position: absolute;
        top: 26px;
        left: -15px;
        display: inline-block;
        border-top: 15px solid transparent;
        border-right: 15px solid #c0c0c0;
        border-bottom: 15px solid transparent;
        content: " ";
      }

      &:after {
        position: absolute;
        top: 27px;
        left: -14px;
        display: inline-block;
        border-top: 14px solid transparent;
        border-right: 14px solid #fff;
        border-bottom: 14px solid transparent;
        content: " ";
      }

      .timeline-body {
        > p {
          margin-bottom: 0;

          + {
            p {
              margin-top: 5px;
            }
          }
        }

        > ul {
          margin-bottom: 0;
        }
      }
    }
  }

  &.timeline-horizontal {
    padding: 20px 0 20px 0;
    display: inline-block;

    &:before {
      height: 3px;
      top: auto;
      bottom: 9px;
      left: 40px;
      right: 0;
      width: 100%;
      margin-bottom: 20px;
    }

    .timeline-item {
      display: table-cell;
      min-height: 280px;
      min-width: 380px;
      padding-right: 20px;
      vertical-align: bottom;

      .timeline-panel {
        width: 100%;
        margin-bottom: 35px;

        &:before {
          top: auto;
          bottom: -15px;
          left: 28px;
          border-right: 15px solid transparent;
          border-top: 15px solid #c0c0c0;
          border-bottom: 0;
          border-left: 15px solid transparent;
        }

        &:after {
          top: auto;
          bottom: -14px;
          left: 29px;
          border-right: 14px solid transparent;
          border-top: 14px solid #fff;
          border-bottom: 0;
          border-left: 14px solid transparent;
        }
      }

      .timeline-badge {
        top: auto;
        bottom: 0;
        left: 45px;
      }
    }
  }
}
</style>
