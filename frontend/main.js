/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */
import Vue from 'vue';
import HistoryViewer from './HistoryViewer';
import { i18n } from './i18n';
import { filterXssAndFormat } from './utils';

Vue.filter('linebreaks', filterXssAndFormat);

document.querySelectorAll('.history-viewer').forEach((elem) => {
  const props = { ...elem.dataset };
  // Get the functions from global scope
  for (const propName of [
    'onItemRenderTable',
    'onHeadersRenderTable',
    'onItemRenderHorizontalTimeline',
    'onItemRenderVerticalTimeline',
    'onHistoryEmptyRender',
  ]) {
    if (props[propName]) {
      props[propName] = window[props[propName]];
    }
  }
  if (props.modes) {
    props.modes = props.modes.split(',');
  }
  new Vue({
    render: (h) => h(HistoryViewer, { props }),
    i18n,
  }).$mount(elem);
});

export {
  filterXssAndFormat,
};
