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
/* eslint-disable vue/prefer-import-from-vue */
import {createApp} from '@vue/runtime-dom';
import HistoryViewer from './HistoryViewer.vue';
import {i18n} from './i18n';
import {filterXssAndFormat} from './utils';


interface Props extends Record<string, unknown> {
  url: string,
  pageSize?: number,
  tags?: string[],
  onItemRenderTable?: CallableFunction,
  onHeadersRenderTable?: CallableFunction,
  onItemRenderHorizontalTimeline?: CallableFunction,
  onItemRenderVerticalTimeline?: CallableFunction,
  onHistoryEmptyRender?: CallableFunction,
}

document.querySelectorAll<HTMLElement>('.history-viewer').forEach((elem) => {
  const props: Props = {url: "", ...elem.dataset};
  for (const propName of [
    'onItemRenderTable',
    'onHeadersRenderTable',
    'onItemRenderHorizontalTimeline',
    'onItemRenderVerticalTimeline',
    'onHistoryEmptyRender',
  ] as string[]) {
    if (propName in props) {
      const customFunctionName = props[propName] as string;
      // @ts-ignore: get the function from global scope
      props[propName] = window[customFunctionName] as CallableFunction;
    }
  }
  if (typeof elem.dataset.modes !== 'undefined') {
    props.modes = elem.dataset.modes.split(',');
  }
  createApp(HistoryViewer, props).use(i18n).mount(elem);
});

// Expose util for custom rendering functions
export {
  filterXssAndFormat,
};
